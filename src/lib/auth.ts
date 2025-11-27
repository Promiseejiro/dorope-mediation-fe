// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '../../types';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials, req) {
                // Add your authentication logic here
                // This is a mock implementation
                if (credentials?.email === 'user@example.com' && credentials?.password === 'password') {
                    const user: User = {
                        id: '1',
                        name: 'John Doe',
                        email: 'user@example.com'
                    };
                    return user;
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        // jwt: true,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
};