import { auth, getUser } from '@/auth';
import { sql } from '@vercel/postgres';

export async function requireUser() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('Unauthorized');
  const user = await getUser(session.user.email);
  if (!user) throw new Error('Unauthorized');
  return user;
}

export async function requireTabOwner(id: string) {
  const user = await requireUser();
  const result = await sql<{ user_id: string }>`SELECT user_id FROM tabs WHERE id=${id}`;
  const tab = result.rows[0];
  if (!tab || (tab.user_id !== user.id && user.admin !== true)) {
    throw new Error('Forbidden');
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.admin !== true) throw new Error('Forbidden');
  return user;
}
