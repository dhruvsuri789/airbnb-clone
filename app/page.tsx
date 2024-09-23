// export const dynamic = "force-dynamic";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps {
  searchParams: IListingsParams;
}

// Every page automatically gets searchParams if there are any
// Every page automatically gets params if there are any by using [id]/page.tsx
// In this case its only getting searchParams
export default async function Home({ searchParams }: HomeProps) {
  // When user clicks the Categories or set Search filters, the searchParams are created and sent to getListings function to fetch data based on that
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  // If there are no listings found, show an empty state and a button to remove all filters
  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
}
