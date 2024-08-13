import EmptyState from "./components/EmptyState";

function NotFound() {
  return (
    <EmptyState
      title="This page could not be found :("
      subtitle="Click below to go back to home"
      showBackHome
    />
  );
}

export default NotFound;
