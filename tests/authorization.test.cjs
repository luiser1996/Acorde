const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

function fixture({ loggedIn = true, exists = true, admin = false, owner = 'owner' } = {}) {
  const queries = [];
  const user = { id: 'owner', email: 'owner@example.invalid', admin, password: 'trusted-hash' };
  const sql = async (strings, ...values) => {
    const query = strings.join('?');
    queries.push({ query, values });
    return { rows: owner === null ? [] : [{ user_id: owner }], rowCount: 1 };
  };
  const mocks = {
    '@/auth': {
      auth: async () => loggedIn ? { user: { email: user.email } } : null,
      getUser: async (email) => exists && email === user.email ? user : undefined,
    },
    '@vercel/postgres': { sql },
    'next-auth': { AuthError: class extends Error {} },
    'next/cache': { revalidatePath() {} },
    'next/navigation': { redirect() {} },
    'uploadthing/server': { UTApi: class {}, UploadThingError: class extends Error {
      constructor(options) { super(options.message); }
    } },
    'uploadthing/next': {
      createUploadthing: () => () => ({
        middleware: (callback) => ({
          onUploadComplete: () => ({ middleware: callback }),
        }),
      }),
    },
    './data': { fetchTabId: async () => 'new-tab', isLessonCompleted: async () => true },
  };
  function load(file) {
    const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const code = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    }).outputText;
    const module = { exports: {} };
    vm.runInNewContext(code, {
      module, exports: module.exports, FormData, console,
      require(name) {
        if (name in mocks) return mocks[name];
        if (name === 'zod' || name === 'bcrypt') return require(name);
        throw new Error(`Unexpected import: ${name}`);
      },
    }, { filename: file });
    return module.exports;
  }
  const guards = load('app/lib/authorization.ts');
  mocks['./authorization'] = guards;
  mocks['@/app/lib/authorization'] = guards;
  return { guards, actions: load('app/lib/actions.ts'), uploader: load('app/api/uploadthing/core.ts').ourFileRouter.imageUploader, queries, user };
}

test('missing sessions and deleted accounts cannot access authenticated actions', async () => {
  for (const options of [{ loggedIn: false }, { exists: false }]) {
    const { actions, queries } = fixture(options);
    await assert.rejects(actions.deleteTab('tab'), /Unauthorized/);
    assert.equal(queries.length, 0);
  }
});

test('other users cannot edit, delete, or finish a tab', async () => {
  for (const name of ['updateTab', 'deleteTab', 'publishTab', 'unpublishTab']) {
    const { actions, queries } = fixture({ owner: 'another-user' });
    const args = name === 'updateTab' ? [new FormData(), 'tab', []] : ['tab'];
    await assert.rejects(actions[name](...args), /Forbidden/);
    assert.equal(queries.some(({ query }) => /INSERT|UPDATE|DELETE/.test(query)), false);
  }
});

test('owners and administrators can manage existing tabs', async () => {
  for (const options of [{}, { admin: true, owner: 'another-user' }]) {
    const { actions, queries } = fixture(options);
    await actions.deleteTab('tab');
    assert.equal(queries.filter(({ query }) => /DELETE/.test(query)).length, 2);
  }
  const { guards } = fixture({ admin: true, owner: null });
  await assert.rejects(guards.requireTabOwner('missing-tab'), /Forbidden/);
});

test('only a verified administrator can change public visibility', async () => {
  for (const admin of [false, undefined, 'false', 'true']) {
    const { actions, queries } = fixture({ admin });
    for (const name of ['makeTabPublic', 'makeTabPrivate']) {
      await assert.rejects(actions[name]('tab'), /Forbidden/);
    }
    assert.equal(queries.length, 0);
  }
  const { actions, queries } = fixture({ admin: true });
  await actions.makeTabPublic('tab');
  assert.equal(queries.filter(({ query }) => /UPDATE/.test(query)).length, 1);
});

test('likes and new tabs always use the authenticated account', async () => {
  const { actions, queries, user } = fixture();
  await actions.likeTab('tab', 'forged-user');
  await actions.unlikeTab('tab', 'forged-user');
  const form = new FormData();
  for (const [name, value] of Object.entries({ name: 'Song', artist: 'Artist', capo: '', url: '', content: 'Tab' })) {
    form.set(name, value);
  }
  await actions.createTab(form, { id: 'forged-user' }, []);
  for (const { values } of queries) {
    assert.equal(values.includes('forged-user'), false);
    assert.equal(values.includes(user.id), true);
  }
});

test('profile updates ignore an account supplied by the client', async () => {
  const { actions, queries, user } = fixture();
  const form = new FormData();
  form.set('name', 'Updated name');
  await actions.updateProfile({ id: 'forged-user', email: 'victim@example.invalid' }, '', '', undefined, form);
  assert.equal(queries.length, 1);
  assert.equal(queries[0].values.includes(user.email), true);
  assert.equal(queries[0].values.includes('victim@example.invalid'), false);
});

test('account and progress actions require a session before processing client inputs', async () => {
  const { actions, queries } = fixture({ loggedIn: false });
  for (const name of ['updateProfile', 'changePassword', 'changeEmail', 'resetProgress', 'deleteAccount', 'getAchievements', 'completeLesson', 'createTab']) {
    await assert.rejects(actions[name]({ id: 'forged-user' }), /Unauthorized/);
  }
  assert.equal(queries.length, 0);
});

test('image uploads require a real account and use its identifier', async () => {
  const { uploader } = fixture({ loggedIn: false });
  await assert.rejects(uploader.middleware(), /Unauthorized/);
  const authenticated = fixture();
  const metadata = await authenticated.uploader.middleware();
  assert.equal(metadata.userId, authenticated.user.id);
});
