import { Admin, Nuser } from "./definitions";
import { sql,db} from '@vercel/postgres';
import {z} from 'zod';
import bcrypt from 'bcrypt';


const clientPromise = db.connect();

export async function fetchNusersByName(name: string) {
  try {
    const data = await sql<Nuser>`
      SELECT * FROM nusers WHERE name = ${name} `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchAdminsByEmail(email: string) {
  try {
    const data = await sql<Admin>`
      SELECT * FROM admins WHERE name = ${email} `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}
const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6) || Buffer,

})

export async function createRecord(formData: FormData){
  const parsedData = registerSchema.safeParse(formData);

  if(parsedData.success){
    const name = parsedData.data?.name;
    const email = parsedData.data?.email;
    const password = await bcrypt.hash(parsedData.data?.password || '', 10);

    const client = await clientPromise;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const insertedUser = await client.sql`
        INSERT INTO admins (id, name, email, password)
        VALUES (uuid_generate_v4(), ${name}, ${email}, ${password})
        ON CONFLICT (email) DO NOTHING;
      `;

    return insertedUser;
  }
}



