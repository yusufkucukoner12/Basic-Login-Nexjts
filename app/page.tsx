import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <div>
        <Link
          href="/login"
          className="flex items-center gap-5 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span>Log in</span>
        </Link>
        
        <Link
          href="/register"
          className="mt-4 flex items-center gap-5 rounded-lg bg-gray-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <span>Register</span>
        </Link>
      </div>
    </div>
  );
}
