import type { Account, NextAuthConfig, User } from 'next-auth';
import { logoutRequest, refreshTokenRequest } from './app/lib/oidc';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL('/dashboard', nextUrl));
  //     }
  //     return true;
  //   },
  // },

  events: {
    async signOut({ token }) {
      await logoutRequest(token.refresh_token);
    },
  },
  // callbacks: {
  //   async jwt({
  //     token,
  //     account,
  //     user,
  //   }: {
  //     token: JWT;
  //     account: Account | null;
  //     user: User | null;
  //   }) {
  //     // Handle JWT token creation and refreshing
  //     if (account && user) {
  //       // Update token with account information
  //       token.access_token = account.access_token;
  //       token.refresh_token = account.refresh_token;
  //       token.access_token_expired =
  //         Date.now() + (account.expires_in - 15) * 1000;
  //       token.refresh_token_expired =
  //         Date.now() + (account.refresh_expires_in - 15) * 1000;
  //       token.user = user;
  //       return token;
  //     } else {
  //       try {
  //         // Send a post request to refresh the token
  //         const response = await refreshTokenRequest(token.refresh_token);
  //         const tokens = await response.data;
  //         if (response.status !== 200) throw tokens;
  //         // Update token with refreshed information
  //         return {
  //           ...token,
  //           access_token: tokens.access_token,
  //           refresh_token: tokens.refresh_token ?? token.refresh_token,
  //           refresh_token_expired:
  //             tokens.refresh_expires_in ?? token.refresh_token_expired,
  //           expires_in: Math.floor(Date.now() / 1000 + tokens.expires_in),
  //           error: null,
  //         };
  //       } catch (e) {
  //         console.error(e);
  //         return null as unknown as JWT;
  //       }
  //     }
  //   },
  //   // Handle session information
  //   async session({ session, token }) {
  //     // Update session with user and access token information
  //     session.user = token.user;
  //     session.error = token.error;
  //     session.access_token = token.access_token;
  //     return session;
  //   },
  // },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
declare module 'next-auth' {
  // Define custom session properties
  interface Session {
    user: {
      sub: string;
      email_verified: boolean;
      name: string;
      preferred_username: string;
      given_name: string;
      family_name: string;
      email: string;
      id: string;
      org_name?: string;
      telephone?: string;
    };
    error?: string | null;
    access_token: string;
  }

  // Define custom user properties
  interface User {
    sub: string;
    email_verified: boolean;
    name: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email: string;
    id: string;
  }

  // Define custom account properties
  interface Account {
    provider: string;
    type: ProviderType;
    id: string;
    access_token: string;
    refresh_token: string;
    idToken: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    id_token: string;
    'not-before-policy': number;
    session_state: string;
    scope: string;
  }

  // Define custom profile properties
  interface Profile {
    sub?: string;
    email_verified: boolean;
    name?: string;
    telephone: string;
    preferred_username: string;
    org_name: string;
    given_name: string;
    family_name: string;
    email?: string;
  }
}

// Declare custom JWT properties
// declare module "next-auth/jwt" {
//   interface JWT {
//     access_token: string;
//     refresh_token: string;
//     refresh_expires_in: number;
//     expires_in: number;
//     user: {
//       sub: string;
//       email_verified: boolean;
//       name: string;
//       telephone: string;
//       preferred_username: string;
//       org_name: string;
//       given_name: string;
//       family_name: string;
//       email: string;
//       id: string;
//     };
//     error?: string | null;
//   }
// }
