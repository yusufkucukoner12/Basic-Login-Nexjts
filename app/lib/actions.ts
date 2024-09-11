'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import {signIn} from '@/auth';
import { AuthError } from 'next-auth';
import { fetchNusersByName } from './userData';
import { parse } from 'path';
import bcrypt from 'bcrypt';
import {db} from '@vercel/postgres'

const client = await db.connect();



export type State = {
  message?: string | null;
};


const nameSchema = z.object({
  name: z.string().min(1),  
});
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function findUser(prevState: State, formData: FormData): Promise<State> {
  const parsed = nameSchema.safeParse({ name: formData.get('name') });

  if (!parsed.success) {
    return {
      message: 'Missing or Invalid Fields. Failed to find user.',
    };
  }

  redirect(`/panel/${parsed.data.name}`);
}


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
    console.log("deneme");
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

export async function register(prevState: string | undefined, formData: FormData) {
  // Convert FormData to plain object
  const data = Object.fromEntries(formData.entries());

  const parsedData = registerSchema.safeParse(data);

  if (parsedData.success) {
    const name = parsedData.data.name;
    const email = parsedData.data.email;
    const password = await bcrypt.hash(parsedData.data.password, 10);

    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    try {
      await client.sql`
        INSERT INTO admins (id, name, email, password)
        VALUES (uuid_generate_v4(), ${name}, ${email}, ${password})
        ON CONFLICT (email) DO NOTHING;
      `;

      return 'Registered successfully';

    } catch (error) {
      return 'Registration failed'; 
    }
  } 

  return 'Registration failed'; 
}



