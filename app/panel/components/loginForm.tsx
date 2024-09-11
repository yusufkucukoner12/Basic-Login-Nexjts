'use client';

import { useActionState } from "react";
import { authenticate } from "../../lib/actions";
import { auth } from "@/auth";

export default function LoginForm() {
    const [errorMessage, formAction] = useActionState(authenticate, undefined);

    console.log(errorMessage);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900" >
            <form action={formAction} className="bg-white p-6 rounded-lg shadow-md" >
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
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Log in
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
    );
}
