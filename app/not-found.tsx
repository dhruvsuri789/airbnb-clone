import EmptyState from "./components/EmptyState";

/**
 * NotFound component renders an EmptyState component with a message indicating
 * that the requested page could not be found. It also provides an option to go back to the home page.
 */
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
