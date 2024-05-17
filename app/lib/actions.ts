'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, createUser, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { ChordsForm, User } from '@/app/lib/definitions';
import { UTApi } from "uploadthing/server"
import { fetchChordId, fetchLessons, fetchTabId, userTabCount, isLessonCompleted, userPublicTabs } from './data';

const TabsSchema = z.object({
  id: z.string(),
  name: z.string().nonempty({
    message: 'Please enter the name of the song.',
  }),
  artist: z.string().nonempty({
    message: 'Please enter the name of the artist.',
  }),
  user_id: z.string(),
  capo: z.number().nullable().refine(value => value === null || Number.isInteger(value), {
    message: 'Capo data should be a non-negative integer or null.',
  }),
  date: z.string(),
  published: z.boolean(),
  content: z.string(),
});

const CreateTabParse = TabsSchema.omit({ id:true, user_id:true, date:true, published:true });
 
const SignUpSchema = z.object({
  name: z.string().nonempty({
    message: 'Please enter your name.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long.',
  }),
});

const FormUpdateProfileSchema = z.object({
  name: z.string().nonempty({
    message: 'Please enter your name.',
  }),
});

const UpdateUser = FormUpdateProfileSchema.omit({});

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6, {
    message: 'Please enter your current password for safety.',
  }),
  newPassword1: z.string().min(6, {
    message: 'Please enter your new password.',
  }),
  newPassword2: z.string().min(6, {
    message: 'Please repeat your new password.',
  }),
});

const SafetySchema = z.object({
  currentPassword: z.string().min(6, {
    message: 'Please enter your current password for safety.',
  }),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function newUser(
  prevState: string | undefined,
  formData: FormData,
): Promise<string | undefined> {

  // Validate form using Zod
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return validatedFields.error.errors[0]?.message || 'Missing Fields. Failed to sign up.';
  }

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;

  // Create user and sign in if successful
  const user = await createUser(name, email, password);
  if (!user){
    return 'Error: This email is already in use.';
  }
  else{
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
}

export async function updateProfile(
  user: User,
  image_url: string,
  url: string,
  prevState: State | undefined,
  formData: FormData,
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get('name'),
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Profile.',
    };
  }
 
  const { name } = validatedFields.data;
  
  const currentPictureUrlRec = user.image_url;
  const currentPictureUrl = currentPictureUrlRec || "";
  const urlParts = currentPictureUrl.split('/');
  const currentPicture = urlParts[urlParts.length - 1];
    
  if (image_url){
    try {
      await sql`
        UPDATE users
        SET image_url = ${image_url}
        WHERE email = ${user.email}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Profile.' };
    }

    // Delete old profile picture from server
    const utapi = new UTApi();
    await utapi.deleteFiles(currentPicture);

    if (user.name != name){
      try {
        await sql`
          UPDATE users
          SET name = ${name}
          WHERE email = ${user.email}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed to Update Profile.' };
      }
    }
    revalidatePath('/dashboard/profile');
    redirect(url);
  }
  else {
    if (user.name != name){
      try {
        await sql`
          UPDATE users
          SET name = ${name}
          WHERE email = ${user.email}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed to Update Profile.' };
      }

      revalidatePath('/dashboard/profile');
      redirect(url);
    }
    else {
      return 'Error: No changes to apply';
    }
  }
}

export async function changePassword(
  user: User,
  prevState: State | undefined,
  formData: FormData,
) {

  // Validate form using Zod
  const validatedFields = ChangePasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword1: formData.get('newPassword1'),
    newPassword2: formData.get('newPassword2'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return validatedFields.error.errors[0]?.message || 'Missing Fields. Failed to change password.';
  }

  // Prepare data for insertion into the database
  const { currentPassword, newPassword1, newPassword2 } = validatedFields.data;

  //Check conditions and change password
  const currentPasswordsMatch = await bcrypt.compare(currentPassword, user.password);
  if (!currentPasswordsMatch){
    return 'Error: Invalid credentials.';
  }
  else{
    if(newPassword1 != newPassword2){
      return 'Error: New passwords does not match.';
    }
    else{
      const hashedPassword = await bcrypt.hash(newPassword1, 10);
      try {
        await sql`
          UPDATE users
          SET password = ${hashedPassword}
          WHERE email = ${user.email}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed to change password.' };
      }

      redirect('/dashboard/settings/account');
    }
  }
}

export async function resetProgress(
  user: User,
  prevState: State | undefined,
  formData: FormData,
) {

  // Validate form using Zod
  const validatedFields = SafetySchema.safeParse({
    currentPassword: formData.get('currentPassword'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return validatedFields.error.errors[0]?.message || 'Missing Fields. Failed to change password.';
  }

  // Prepare data for insertion into the database
  const { currentPassword } = validatedFields.data;
  const resetProgress = formData.get('resetProgress') === 'on';

  //Check conditions and change password
  const currentPasswordsMatch = await bcrypt.compare(currentPassword, user.password);
  if (!currentPasswordsMatch){
    return 'Error: Invalid credentials.';
  }
  else{
    if(!resetProgress){
      return 'Error: No changes to apply.';
    }
    else{
      try {
        await sql`
          DELETE FROM user_achievements 
          WHERE user_id = ${user.id}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed to change password.' };
      }

      try {
        await sql`
          DELETE FROM user_lessons 
          WHERE user_id = ${user.id}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed to change password.' };
      }

      revalidatePath('/dashboard/profile');
      revalidatePath('/dashboard/learn');
      redirect('/dashboard/settings/account');
    }
  }
}

export async function deleteAccount(
  user: User,
  prevState: State | undefined,
  formData: FormData,
) {

  // Validate form using Zod
  const validatedFields = SafetySchema.safeParse({
    currentPassword: formData.get('currentPassword'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return validatedFields.error.errors[0]?.message || 'Missing Fields. Failed to change password.';
  }

  // Prepare data for delete
  const { currentPassword } = validatedFields.data;
  const deleteAccount = formData.get('deleteAccount') === 'on';

  // Delete old profile picture from server
  const currentPictureUrlRec = user.image_url;
  const currentPictureUrl = currentPictureUrlRec || "";
  const urlParts = currentPictureUrl.split('/');
  const currentPicture = urlParts[urlParts.length - 1];

  //Check conditions and change password
  const currentPasswordsMatch = await bcrypt.compare(currentPassword, user.password);
  const user_public_tabs = await userPublicTabs(user.id);

  if (!currentPasswordsMatch){
    return 'Error: Invalid credentials.';
  }
  else{
    if(!deleteAccount){
      return 'Error: No changes to apply.';
    }
    else{
      const utapi = new UTApi();
      await utapi.deleteFiles(currentPicture);
      
      try {
        await sql`
          DELETE FROM user_achievements 
          WHERE user_id = ${user.id}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed.' };
      }

      try {
        await sql`
          DELETE FROM user_lessons 
          WHERE user_id = ${user.id}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed.' };
      }

      try {
        await sql`
          DELETE FROM user_tabs 
          WHERE user_id = ${user.id}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed.' };
      }

      try {
        await sql`
          DELETE FROM tab_chords 
          WHERE tab_id IN (
            SELECT id
            FROM tabs
            WHERE published = false AND user_id = ${user.id}
          )
        `;
      } catch (error) {
        return { message: 'Database Error: Failed.' };
      }

      try {
        await sql`
          DELETE FROM tabs
          WHERE published = false
          AND user_id = ${user.id}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed.' };
      }

      if (user_public_tabs){
        for (const tab of user_public_tabs) {
          try {
            await sql`
              UPDATE tabs
              SET user_id = '3c533888-79bd-4f57-8169-71428ac6fdaf'
              WHERE id = ${tab.id}
            `;
          } catch (error) {
            console.error('Database Error:', error);
            return { message: 'Database Error: Failed.' };
          }
        }
      }

      try {
        await sql`
          DELETE FROM users
          WHERE id = ${user.id}
        `;
      } catch (error) {
        return { message: 'Database Error: Failed.' };
      }

      await signOut();
    }
  }
}

export async function getAchievements(
  user: User,
){
  const lessons = await fetchLessons();

  const lessons1 = lessons.slice(0, 5);
  const completedLessons1 = await Promise.all(lessons1.map(async (lesson) => {
    const result = await isLessonCompleted(user, lesson.id);
    return result;
  }));
  const lessonsCompleted1 = completedLessons1.filter(lessonCompleted => lessonCompleted).length;

  if (lessonsCompleted1 === 5){
    try {
      const completedAchievement1 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = '7204d041-989e-4ea7-8ea4-585b75b18032'
      `;

      if (completedAchievement1.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, '7204d041-989e-4ea7-8ea4-585b75b18032')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement1.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement1.');
    }
  }

  const lessons2 = lessons.slice(0, 10);
  const completedLessons2 = await Promise.all(lessons2.map(async (lesson) => {
    const result = await isLessonCompleted(user, lesson.id);
    return result;
  }));
  const lessonsCompleted2 = completedLessons2.filter(lessonCompleted => lessonCompleted).length;

  if (lessonsCompleted2 === 10){
    try {
      const completedAchievement2 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = 'be406fa7-34cc-44e5-8cc5-46912244c502'
      `;

      if (completedAchievement2.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, 'be406fa7-34cc-44e5-8cc5-46912244c502')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement2.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement2.');
    }
  }

  const lessons3 = lessons.slice(0, 15);
  const completedLessons3 = await Promise.all(lessons3.map(async (lesson) => {
    const result = await isLessonCompleted(user, lesson.id);
    return result;
  }));
  const lessonsCompleted3 = completedLessons3.filter(lessonCompleted => lessonCompleted).length;

  if (lessonsCompleted3 === 15){
    try {
      const completedAchievement3 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = 'f5283f55-8b66-491f-b410-bf8f9cf7bc7c'
      `;

      if (completedAchievement3.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, 'f5283f55-8b66-491f-b410-bf8f9cf7bc7c')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement3.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement3.');
    }
  }

  const lessons4 = lessons.slice(0, 17);
  const completedLessons4 = await Promise.all(lessons4.map(async (lesson) => {
    const result = await isLessonCompleted(user, lesson.id);
    return result;
  }));
  const lessonsCompleted4 = completedLessons4.filter(lessonCompleted => lessonCompleted).length;

  if (lessonsCompleted4 === 17){
    try {
      const completedAchievement4 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = '91bb5ce8-a2fc-4456-8621-dcd76017959f'
      `;

      if (completedAchievement4.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, '91bb5ce8-a2fc-4456-8621-dcd76017959f')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement4.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement4.');
    }
  }

  const lessons5 = lessons.slice(17, 20);
  const completedLessons5 = await Promise.all(lessons5.map(async (lesson) => {
    const result = await isLessonCompleted(user, lesson.id);
    return result;
  }));
  const lessonsCompleted5 = completedLessons5.filter(lessonCompleted => lessonCompleted).length;

  if (lessonsCompleted5 === 3){
    try {
      const completedAchievement5 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = 'b2e43581-a647-4811-be00-fed3ae7d8802'
      `;

      if (completedAchievement5.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, 'b2e43581-a647-4811-be00-fed3ae7d8802')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement5.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement5.');
    }
  }

  if ((lessonsCompleted1 === 5) && (lessonsCompleted2 === 10) && (lessonsCompleted3 === 15) && (lessonsCompleted4 === 17) && (lessonsCompleted5 === 3)){
    try {
      const completedAchievement5 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = 'a468ac0a-f8fc-4baa-b893-fcb17dc61aad'
      `;

      if (completedAchievement5.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, 'a468ac0a-f8fc-4baa-b893-fcb17dc61aad')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement5.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement5.');
    }
  }

  const lesson6 = lessons[5];
  const completedLesson6 = await isLessonCompleted(user, lesson6.id);
  const lessonCompleted6 = completedLesson6 ? 1 : 0;

  if (lessonCompleted6) {
    try {
      const completedAchievementL6 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = '3b99d2e1-cc58-4d44-8b54-2042c0379bf0'
      `;

      if (completedAchievementL6.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, '3b99d2e1-cc58-4d44-8b54-2042c0379bf0')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement from lesson 6.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement from lesson 6.');
    }
  }

  const lesson9 = lessons[8];
  const completedLesson9 = await isLessonCompleted(user, lesson9.id);
  const lessonCompleted9 = completedLesson9 ? 1 : 0;

  if (lessonCompleted9) {
    try {
      const completedAchievementL7 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = 'd2323a37-032b-408a-b408-db6dfae85790'
      `;

      if (completedAchievementL7.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, 'd2323a37-032b-408a-b408-db6dfae85790')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement from lesson 9.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement from lesson 9.');
    }
  }

  const lesson12 = lessons[11];
  const completedLesson12 = await isLessonCompleted(user, lesson12.id);
  const lessonCompleted12 = completedLesson12 ? 1 : 0;

  if (lessonCompleted12) {
    try {
      const completedAchievementL12 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = '8a3ddf9f-00aa-4018-b494-b619b64e488d'
      `;

      if (completedAchievementL12.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, '8a3ddf9f-00aa-4018-b494-b619b64e488d')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement from lesson 12.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement from lesson 12.');
    }
  }

  const lesson17 = lessons[16];
  const completedLesson17 = await isLessonCompleted(user, lesson17.id);
  const lessonCompleted17 = completedLesson17 ? 1 : 0;

  if (lessonCompleted17) {
    try {
      const completedAchievementL17 = await sql`
        SELECT * FROM user_achievements
        WHERE user_id = ${user.id}
        AND achievement_id = '28a6a23f-85e5-49d0-a100-86297d808947'
      `;

      if (completedAchievementL17.rowCount === 0) {
        try {
          const data = await sql`
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (${user.id}, '28a6a23f-85e5-49d0-a100-86297d808947')
          `;
          revalidatePath('/dashboard/profile');
        } catch (err) {
          console.error('Database Error:', err);
          throw new Error('Failed to get achievement from lesson 17.');
        }
      }
    } catch (err) {
      console.error('Database Error:', err);
      throw new Error('Failed to get achievement from lesson 17.');
    }
  }
}

export async function completeLesson(
  user: User,
  lesson_id: string,
) {
  try {
    const completedLesson = await sql`
      SELECT * FROM user_lessons
      WHERE user_id = ${user.id}
      AND lesson_id = ${lesson_id}
    `;

    if (completedLesson.rowCount === 0) {
      try {
        const data = await sql`
          INSERT INTO user_lessons (user_id, lesson_id)
          VALUES (${user.id}, ${lesson_id})
        `;
        revalidatePath('/dashboard/learn');
        revalidatePath('/dashboard/learn/beginner-guitarist');
      } catch (err) {
        console.error('Database Error:', err);
        throw new Error('Failed to complete lesson 1.');
      }
    }
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to complete lesson 1.');
  }
}

export async function createTab(
  formData: FormData,
  user: User,
  selectedChords: ChordsForm[]
) {
  // Validate form using Zod
  const validatedFields = CreateTabParse.safeParse({
    name: formData.get('name') as string,
    artist: formData.get('artist') as string,
    capo: formData.get('capo') !== null && formData.get('capo') !== '' ? parseInt(formData.get('capo') as string) : null,
    content: formData.get('content') as string,
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Tab.',
    };
  }

  // Prepare data for insertion into the database
  const { name, artist, capo, content } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
  const user_tabs = await userTabCount(user.id);
 
  // Insert data into the database
  try {
    if(capo) {
      await sql`
        INSERT INTO tabs (name, artist, user_id, capo, date, content)
        VALUES (${name}, ${artist}, ${user.id}, ${capo}, ${date}, ${content})
      `;
    }
    else {
      await sql`
        INSERT INTO tabs (name, artist, user_id, date, content)
        VALUES (${name}, ${artist}, ${user.id}, ${date}, ${content})
      `;
    }
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Create Tab.',
    };
  }

  const newTabId = await fetchTabId(name, artist, user.id);

  if (newTabId && selectedChords.length > 0) {
    for (const chord of selectedChords) {
      const chordId = await fetchChordId(chord.tone, chord.semitone);
      
      try {
        await sql`
          INSERT INTO tab_chords (tab_id, chord_id)
          VALUES (${newTabId}, ${chordId})
        `;
      } catch (error) {
        console.log(error);
        return {
          message: 'Database Error: Failed to Create Tab Chords.',
        };
      }
    }
  }

  if (newTabId && (user_tabs > 0)){
    completeLesson(user, 'c71d619a-dbe0-4cef-b992-0fda31ad267b');
    getAchievements(user);
  }
 
  revalidatePath('/dashboard/tabs');
  revalidatePath('/dashboard/tabs/my-tabs');
  redirect(`/dashboard/tabs/${newTabId}`);
}

export async function updateTab(
  formData: FormData,
  id: string,
  selectedChords: ChordsForm[]
) {
  // Validate form using Zod
  const validatedFields = CreateTabParse.safeParse({
    name: formData.get('name') as string,
    artist: formData.get('artist') as string,
    capo: formData.get('capo') !== null && formData.get('capo') !== '' ? parseInt(formData.get('capo') as string) : null,
    content: formData.get('content') as string,
  });
 
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Tab.',
    };
  }

  // Prepare data for insertion into the database
  const { name, artist, capo, content } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];
 
  // Insert data into the database
  try {
    if (capo) {
      await sql`
        UPDATE tabs
        SET name = ${name}, artist = ${artist}, capo = ${capo}, date = ${date}, content = ${content}
        WHERE id = ${id}
      `;
    }
    else {
      await sql`
        UPDATE tabs
        SET name = ${name}, artist = ${artist}, capo = null, date = ${date}, content = ${content}
        WHERE id = ${id}
      `;
    }

    if (selectedChords.length > 0) {
      try {
        await sql`
          DELETE FROM tab_chords
          WHERE tab_id=${id}
        `;
      } catch(error){
        console.log(error);
        return {
          message: 'Database Error: Failed to Edit Tab.',
        };
      }

      for (const chord of selectedChords) {
        const chordId = await fetchChordId(chord.tone, chord.semitone);
        
        try {
          await sql`
            INSERT INTO tab_chords (tab_id, chord_id)
            VALUES (${id}, ${chordId})
          `;
        } catch (error) {
          console.log(error);
          return {
            message: 'Database Error: Failed to Update Tab Chords.',
          };
        }
      }
    }
  } catch (error) {
    console.log(error);
    return {
      message: 'Database Error: Failed to Update Tab.',
    };
  }
 
  revalidatePath(`/dashboard/tabs/${id}`);
  revalidatePath('/dashboard/tabs')
  revalidatePath('/dashboard/tabs/my-tabs');
  redirect(`/dashboard/tabs/${id}`);
}

export async function deleteTab(id: string) {
  try {
    await sql`
      DELETE FROM tab_chords 
      WHERE tab_id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed.' };
  }

  try {
    await sql`
      DELETE FROM tabs 
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Tab.' };
  }

  revalidatePath('/dashboard/tabs');
  revalidatePath('/dashboard/tabs/my-tabs');
  redirect('/dashboard/tabs/my-tabs');
}

export async function likeTab(id: string, user_id: string) {
  try {
    await sql`
      INSERT INTO user_tabs (user_id, tab_id)
      VALUES (${user_id}, ${id})
    `;
  } catch (error) {
    return { message: 'Database Error: Failed.' };
  }

  revalidatePath('/dashboard/tabs/my-tabs');
  revalidatePath(`/dashboard/tabs/${id}`);
}

export async function unlikeTab(id: string, user_id: string) {
  try {
    await sql`
      DELETE FROM user_tabs 
      WHERE tab_id = ${id} AND user_id = ${user_id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed.' };
  }

  revalidatePath('/dashboard/tabs/my-tabs');
  revalidatePath(`/dashboard/tabs/${id}`);
}

export async function publishTab(id: string) {
  try {
    await sql`
      UPDATE tabs
      SET finished = true
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed.' };
  }

  revalidatePath('/dashboard/tabs');
  revalidatePath('/dashboard/my-tabs');
  revalidatePath(`/dashboard/tabs/${id}`);
  redirect('/dashboard/tabs/my-tabs');
}

export async function unpublishTab(id: string) {
  try {
    await sql`
      UPDATE tabs
      SET finished = false
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed.' };
  }

  revalidatePath('/dashboard/tabs');
  revalidatePath('/dashboard/my-tabs');
  revalidatePath(`/dashboard/tabs/${id}`);
  redirect(`/dashboard/tabs/${id}`);
}

export async function makeTabPublic(id: string) {
  try {
    await sql`
      UPDATE tabs
      SET published = true
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed.' };
  }

  revalidatePath('/dashboard/tabs');
  revalidatePath('/dashboard/my-tabs');
  revalidatePath(`/dashboard/tabs/${id}`);
  redirect('/dashboard/tabs/admin');
}

export async function makeTabPrivate(id: string) {
  try {
    await sql`
      UPDATE tabs
      SET published = false
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed.' };
  }

  revalidatePath('/dashboard/tabs');
  revalidatePath('/dashboard/my-tabs');
  revalidatePath(`/dashboard/tabs/${id}`);
  redirect(`/dashboard/tabs/${id}`);
}