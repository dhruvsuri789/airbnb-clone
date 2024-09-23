import getCurrentUser from "@/app/actions/getCurrentUser";
import prismaClient from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

//Favorite a listing
export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  // If the listingId is not present or is not a string, throw an error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Add the ID to the favorites
  // We always update the favoriteIds array in the user model with new object
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);

  // Update the user model with the new favoriteIds array
  const user = await prismaClient.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  // Return the updated user as JSON.
  // Route Handlers always return a JSON or redirects to certain page
  return NextResponse.json(user);
}

//Un-Favorite a listing
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  // If the listingId is not present or is not a string, throw an error
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // Filter out the ID from the favorites
  // We always update the favoriteIds array in the user model with new object
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  // Update the user model with the new favoriteIds array
  const user = await prismaClient.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  // Return the updated user as JSON.
  // Route Handlers always return a JSON or redirects to certain page
  return NextResponse.json(user);
}
