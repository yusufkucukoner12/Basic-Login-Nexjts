'use client';
import { useActionState } from "react";
import { register } from '@/app/lib/actions';
import Link from 'next/link';

export default function RegisterForm() {
  const [result, formAction] = useActionState(register, undefined);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <form className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full" action={formAction}>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create Your Account</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="name"
            placeholder="Enter your name"
            required
            className="block w-full p-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            className="block w-full p-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            minLength={6}
            className="block w-full p-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>

      {result && <p className="text-red-500 mt-4">{result}</p>}

      {/* If registration is successful, show login link */}
      {result && (
        <Link href="/login">
          <p className="mt-4 text-blue-500 hover:underline">Already have an account? Log in</p>
        </Link>
      )}
    </div>
  );
}
