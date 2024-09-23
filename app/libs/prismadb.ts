import { PrismaClient } from "@prisma/client";

/**
 * Extends the global namespace to include a `prisma` variable of type `PrismaClient` or `undefined`.
 */
declare global {
  var prisma: PrismaClient | undefined;
}

/**
 * Initializes a PrismaClient instance. If a `prisma` instance already exists in the global namespace, it reuses it.
 * Otherwise, it creates a new instance of PrismaClient.
 */
const prismaClient = globalThis.prisma || new PrismaClient();

/**
 * In non-production environments, assigns the created PrismaClient instance to the global namespace.
 * This ensures that the same instance is reused across multiple invocations, preventing multiple connections.
 */
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;

export default prismaClient;
