// types/next-auth.d.ts
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        accessToken: string;
        user: {
            id: string;
            role: string;
            firstName: string;
            lastName: string;
            name: string;
            email: string;
        }
    }
}