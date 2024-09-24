import prismaClient from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    /* 
    id: { in: [...] }: This specifies that the id field of the records must be within a certain set of values. The in operator is used to match any of the values in the provided array. id should be within these array values.

    [...(currentUser.favoriteIds || [])]: This is the array of IDs that the id field should match. It spreads the currentUser.favoriteIds array into a new array. If currentUser.favoriteIds is null or undefined, it defaults to an empty array [].
    */
    const favorites = await prismaClient.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return favorites;

    //For Object passing error -> To learn more go to getCurrentUser.ts for this
    // const safeFavorites = favorites.map((favorite) => ({
    //   ...favorite,
    //   createdAt: favorite.createdAt.toISOString(),
    // }));

    // return safeFavorites;
  } catch (error: any) {
    throw new Error("Error getting favorites: " + error);
  }
}
