import { auth } from "@/auth";

/**
 * Middleware function for authentication.
 * This middleware will be used to protect routes by ensuring that the user is authenticated.
 */
export const middleware = auth;

// Protecting all our routes that need to be protected from unauthorised users
/**
 * Configuration object for route protection middleware.
 * This middleware will be applied to all routes that match the specified patterns.
 * It ensures that all the routes listed are protected from unauthorized users.
 */
export const config = {
  // This middleware will be applied to all routes that match the below pattern
  // This will protect all the routes that need to be protected from unauthorised users
  /**
   * Array of route patterns to which the middleware will be applied.
   * Each route listed here will be protected.
   */
  matcher: [
    "/trips", // Protect the trips route
    "/favorites", // Protect the favorites route
    "/reservations", // Protect the reservations route
    "/properties", // Protect the properties route
  ],
};
