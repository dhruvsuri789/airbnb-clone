import prismaClient from "../libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prismaClient.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;

    //For Object passing error -> To learn more go to getCurrentUser.ts for this
    /* const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings; */
  } catch (error: any) {
    throw new Error("Error getting listings: " + error);
  }
}
