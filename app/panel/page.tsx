import { signOut } from '@/auth';
import UserForm from './components/UserForm';

export default function HomePage(){

  return (
    <div>
      <UserForm />

      <form
        action={async () => {
          'use server';
          await signOut();
        }}>
          <button className="flex h-[48px]  items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 text-black md:flex-none md:justify-start md:p-2 md:px-3">
            <div >Sign Out</div>
          </button>
        </form>
    </div>
  );
} 