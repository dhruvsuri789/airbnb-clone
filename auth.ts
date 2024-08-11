import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "./app/libs/prismadb";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

/* This code block is exporting several constants (`auth`, `handlers`, `signIn`, `signOut`) from the
result of calling the `NextAuth` function with a configuration object as an argument. Here's a
breakdown of what each constant represents: */
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} =
  /* This code block is configuring the authentication settings using NextAuth in a TypeScript
environment. Here's a breakdown of what it is doing: */
  NextAuth({
    adapter: PrismaAdapter(prismaClient),
    providers: [
      Github({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      CredentialsProvider({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          console.log(credentials);
          // credentials contain the email and password
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid Credentials");
          }

          // Find the user in the database
          let user = null;
          user = await prisma?.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          // If there is no user and there is no hashed password throw error
          if (!user || !user?.hashedPassword) {
            throw new Error("Invalid User or Hashed password");
          }

          // Checking the password with the encrypted hashed password
          const isCorrectPassword = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("Password is incorrect");
          }

          return user;
        },
      }),
    ],
    // Whenever any errors happens it will redirect to our home page
    pages: {
      signIn: "/",
    },
    // You only want to enable debugging in development, avoid termainal errors
    debug: process.env.NODE_ENV === "development",
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
  });
