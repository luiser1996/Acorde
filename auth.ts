import NextAuth from 'next-auth';
import { getSession } from 'next-auth/react';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { NextApiRequest } from 'next';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';

// Función para obtener el usuario actualmente autenticado
async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getSession({});
    if (session?.user) {
      // Si hay un usuario en la sesión, devolverlo
      return session.user as User;
    } else {
      // Si no hay sesión o no hay usuario en la sesión, devolver null
      return null;
    }
  } catch (error) {
    console.error('Failed to get current user:', error);
    throw new Error('Failed to get current user.');
  }
}

export { getCurrentUser };

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});