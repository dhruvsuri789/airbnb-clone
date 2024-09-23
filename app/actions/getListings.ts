import prismaClient from "../libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  // Use dynamic data outside of try/catch statements and avoid DynamicServerError
  // When you need to use dynamic data, use the following pattern
  const {
    userId,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
    startDate,
    endDate,
    category,
  } = params;

  let query: any = {};

  try {
    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        // Greater than or equal; plus sign converts string to number
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (startDate && endDate) {
      //Using reverse filtering
      /**
       * Constructs a query object to find records that do not have overlapping reservations.
       * The query checks for reservations where:
       * - The end date is greater than or equal to the start date of the new reservation and the start date is less than or equal to the start date of the new reservation.
       * - OR the start date is less than or equal to the end date of the new reservation and the end date is greater than or equal to the end date of the new reservation.
       * Putting it all together, this query is looking for records that do not have any reservations that overlap with a given time period defined by startDate and endDate. If a record has a reservation that overlaps with this time period, it will be excluded from the results.
       */
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    // This is where the magic happens
    // We will get all the listings that match the query
    const listings = await prismaClient.listing.findMany({
      where: query,
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
