import prisma from "@/prisma/prisma";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { userTypes } from "@/lib/types";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", placeholder: "Enter your email" },
        password: { label: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        try {
          await prisma.$connect();
          const askedUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (!askedUser) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            askedUser?.password!
          );

          if (isPasswordCorrect) {
            return askedUser;
          } else {
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
