import next from 'next';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/',
  },
  
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPanel = nextUrl.pathname.startsWith('/panel');
      const isOnHomepage = nextUrl.pathname.startsWith('/homepage');

      // Allow access to /panel if logged in
      if (isOnPanel) {
        if (isLoggedIn) return true;
        return false; 
      }

      // Avoid redirect loop if already on homepage
      if (isLoggedIn && !isOnHomepage) {
        return Response.redirect(new URL('/homepage', nextUrl));
      }

      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
