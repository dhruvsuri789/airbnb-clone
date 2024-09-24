import prismaClient from "../libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    // Depending on this we will create diffrent query
    const { listingId, userId, authorId } = params;

    // building query and searching by different things
    const query: any = {};

    // searching by listing id and getting all the reservations for that listing
    if (listingId) {
      query.listingId = listingId;
    }

    // searching by user id and getting all the trips for that user
    if (userId) {
      query.userId = userId;
    }

    // searching by author id and getting all the reservations that other users made for our listings
    if (authorId) {
      query.listing = { userId: authorId };
    }

    // getting all the reservations (listings) where I am the author
    const reservations = await prismaClient.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;

    //For Object passing error -> To learn more go to getCurrentUser.ts for this
    /* const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    })); 
    return safeReservations;
    */
  } catch (error: any) {
    throw new Error(error);
  }
}
