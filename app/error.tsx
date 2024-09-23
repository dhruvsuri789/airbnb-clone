"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

/**
 * ErrorState component to display an error message. It always runs on Client side.
 *
 * @param {Object} props - The properties object.
 * @param {Error} props.error - The error object to be logged.
 */
function ErrorState({ error }: ErrorStateProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh-oh" subtitle="Something went wrong" />;
}

export default ErrorState;
