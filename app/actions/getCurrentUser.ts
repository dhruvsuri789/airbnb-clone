import { auth } from "@/auth";
import prismaClient from "../libs/prismadb";

export default async function getCurrentUser() {
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
