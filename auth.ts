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
/* 
auth: The main authentication object.
handlers: Contains HTTP handlers for GET and POST requests.signIn: Function to handle user sign-in.
signOut: Function to handle user sign-out.
*/
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} =
  /* This code block is configuring the authentication settings using NextAuth in a TypeScript environment.
  adapter: Uses PrismaAdapter to connect to a Prisma client, which is used for database interactions.
  providers: Specifies the authentication providers (GitHub, Google, and custom credentials).
  pages: Customizes the sign-in page to redirect to the home page ("/").
  debug: Enables debugging in development mode.
  session: Configures session management to use JSON Web Tokens (JWT).
  secret: Secret key for encrypting JWTs.
*/
  NextAuth({
    adapter: PrismaAdapter(prismaClient),
    providers: [
      // Uses GitHub OAuth for authentication.
      Github({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
      }),
      // Uses Google OAuth for authentication.
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      // Custom authentication using email and password.
      CredentialsProvider({
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        /* 
        authorize function:
          - Validates the presence of email and password.
          - Fetches the user from the database using Prisma.
          - Checks if the user exists and if the hashed password matches the provided password using bcrypt.
          - Returns the user if authentication is successful, otherwise throws an error.
        */
        authorize: async (credentials) => {
          // credentials contain the email and password
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid Credentials");
          }

          // Find the user in the database
          const user = await prismaClient?.user.findUnique({
            where: {
              email: credentials.email as string,
            },
          });

          // If there is no user or there is no hashed password throw error
          if (!user || !user?.hashedPassword) {
            throw new Error("Invalid User or Hashed password");
          }

          // Checking the password with the encrypted hashed password
          /**
           * Compares the provided password with the stored hashed password.
           *
           * @param {string} credentials.password - The password provided by the user.
           * @param {string} user.hashedPassword - The hashed password stored in the database.
           * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the password is correct.
           */
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
    // Customizes the sign-in page to redirect to the home page ("/").
    // Redirects to the home page ("/") whenever an error occurs during sign-in.
    pages: {
      signIn: "/",
    },
    // You only want to enable debugging in development, avoid terminal errors. Enables debugging in development mode to help with troubleshooting.
    debug: process.env.NODE_ENV === "development",
    // Uses JWT for session management, which is a stateless way to handle user sessions.
    session: { strategy: "jwt" },
    // Uses an environment variable for the secret key to secure JWTs.
    secret: process.env.NEXTAUTH_SECRET,
  });
