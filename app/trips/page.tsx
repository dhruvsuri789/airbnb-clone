import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

async function TripsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  //TODO reservations is empty here when the user is redirected from Listing Client page to /trips page
  // Because its an async function
  //Fixed it using loading.tsx or not
  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserved any trips."
        showRefresh
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
}

export default TripsPage;
