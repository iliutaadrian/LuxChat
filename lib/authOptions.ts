import {AuthOptions} from "next-auth";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: { label: 'username', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials: { username: string, password: string }) {
                const { username, password } = credentials;

                if (!username || !password) {
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findFirst({
                    where: {
                        username: credentials.username
                    }
                });

                if (!user || !user.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword);

                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token = user as unknown as { [key: string]: any };

            return token;
        },
        session: async ({ session, token }) => {
            // @ts-ignore
            session.user = { ...token }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,

}
