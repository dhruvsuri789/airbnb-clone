import { auth } from "@/auth";
import prismaClient from "../libs/prismadb";

/**
 * Retrieves the current user based on the session information.
 *
 * @returns The current user object if found, otherwise null.
 *
 * @throws {Error} If there is an issue retrieving the user, an error is caught and null is returned.
 */
/* 
For explanation -> To learn more go to Notion `Programming/Session and Database for user` for this
*/
export default async function getCurrentUser() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prismaClient.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error: any) {
    return null;
    // Because we want it to work even for logged out users so we don't throw an error
    // throw new Error("Error getting current user: " + error);
  }

  /* 
  For Warning: Only plain objects can be passed to Client Components from Server Components. Date objects are not supported.

  Pass it like this. I think its now supported now in modern NextJS

  return {
    ...currentUser,
    createdAt: currentUser.createdAt.toISOString(),
    updatedAt: currentUser.updatedAt.toISOString(),
    emailVerified: currentUser.emailVerified?.toISOString() || null,
  };
  */
}
