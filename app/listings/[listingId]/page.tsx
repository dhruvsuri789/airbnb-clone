import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import { list } from "postcss";

interface IParams {
  listingId?: string;
}

//This is a Server Component so we can only use Actions such as getListingById here which can directly communicate with the database and not useRouter hook for navigation as it can only be used inside Client Components
// We can still access the parameters in Server Components which is the url

async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);

  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} />;
}

export default ListingPage;
