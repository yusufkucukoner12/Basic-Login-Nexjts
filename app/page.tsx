import LoginForm from '@/app/panel/components/loginForm';
import { redirect } from 'next/navigation';
import Link from 'next/link'

export default function HomePage(){


  return (
    <div>

      <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
          </Link>
    </div>
  );
} 
