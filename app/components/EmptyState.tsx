"use client";

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showRefresh?: boolean;
  showBackHome?: boolean;
}

/**
 * EmptyState component displays a message when no exact matches are found.
 * It provides options to reset filters, refresh the page, or go back home.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.title="No exact matches"] - The title to display.
 * @param {string} [props.subtitle="Try changing or removing some of your filters"] - The subtitle to display.
 * @param {boolean} props.showReset - Flag to show the reset button.
 * @param {boolean} props.showRefresh - Flag to show the refresh button.
 * @param {boolean} props.showBackHome - Flag to show the back home button.
 */
function EmptyState({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
  showRefresh,
  showBackHome,
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
        {showRefresh && (
          <Button outline label="Refresh" onClick={() => router.refresh()} />
        )}
        {showBackHome && (
          <Button
            outline
            label="Go back home"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
}

export default EmptyState;
