// lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }
                try {
                    const response = await fetch(`${API_BASE_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message || 'Login failed');
                    }

                    if (data.access_token && data.user) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            name: `${data.user.firstName} ${data.user.lastName}`,
                            firstName: data.user.firstName,
                            lastName: data.user.lastName,
                            accessToken: data.access_token,
                            ...data.user
                        };
                    }

                    return null;
                } catch (error: any) {
                    console.error('Login error:', error);
                    if (error.message.includes('Invalid')) {
                        throw new Error('Invalid email or password');
                    } else if (error.message.includes('verified')) {
                        throw new Error("UNVERIFIED");
                    } else if (error.message.includes('not found')) {
                        throw new Error('Account not found');
                    } else {
                        throw new Error(error.message || 'Login failed. Please try again.');
                    }
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login?error=',
    },
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id;
                token.email = user.email;
                token.name = user.name;
                token.firstName = (user as any).firstName;
                token.lastName = (user as any).lastName;
                token.accessToken = (user as any).accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                (session.user as any).firstName = token.firstName;
                (session.user as any).lastName = token.lastName;
                (session.user as any).email = token.email;
                (session as any).accessToken = token.accessToken;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.includes('/login')) {
                return `${baseUrl}/`;
            }
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },


    events: {
        async signOut({ token }) {
            try {
                await fetch(`${API_BASE_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token.accessToken}`,
                    },
                });
            } catch (error) {
                console.error('Logout API error:', error);
            }
        },
    },
    debug: process.env.NODE_ENV === 'development',
};