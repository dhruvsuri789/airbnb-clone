import { auth } from "@/auth";

export const middleware = auth;

// Protecting all our routes that need to be protected from unauthorised users
export const config = {
  matcher: ["/trips", "/favorites", "/reservations", "/properties"],
};
