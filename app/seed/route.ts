import { db } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import {admins,  nusers} from '@/app/lib/placeholder-data';


const client = await db.connect();

async function seedAdmins(){
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
     CREATE TABLE IF NOT EXISTS admins (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email TEXT NOT NULL UNIQUE,
       password TEXT NOT NULL
     );
   `;

   const insertedUsers = await Promise.all(
      admins.map(async (admin) => {
       const hashedPassword = await bcrypt.hash(admin.password, 10);
       return client.sql`
         INSERT INTO admins (id, name, email, password)
         VALUES (${admin.id}, ${admin.name}, ${admin.email}, ${hashedPassword})
         ON CONFLICT (id) DO NOTHING;
       `;
     }),
   );

   return insertedUsers;

}

async function seedNusers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`CREATE TABLE IF NOT EXISTS nusers(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female')) NOT NULL
  );`;

  const insertedUsers = await Promise.all(
    nusers.map(async (user) => {
      return client.sql`
        INSERT INTO nusers (id, name, age, gender)
        VALUES (${user.id}, ${user.name}, ${user.age}, ${user.gender})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedUsers;
}



export async function GET() {   
    try{
        await client.sql`BEGIN`;
        await seedNusers();
        await client.sql`COMMIT`;
        return Response.json({ message: 'Database seeded successfully' });
    }
    catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
      }

}