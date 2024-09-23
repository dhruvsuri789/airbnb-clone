"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";
import { categories } from "./navbar/Categories";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

function CategoryBox({ icon: Icon, label, selected }: CategoryBoxProps) {
  const router = useRouter();
  const params = useSearchParams();

  // Handling category click
  const handleClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      // Creating object out of all our current parameters
      // It will have many parameters -> Search by location, start and end date, number of guests, rooms
      // We want to make sure by clicking categories we don't accidentally remove those previous parameters.
      // We want to combine all three parameters
      currentQuery = qs.parse(params.toString());
    }

    // Updating query with new category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    // If category is already selected, we want to remove it from the query
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // Converting object into string
    // We want to make sure we don't have any empty parameters
    /**
     * Constructs a URL with query parameters.
     *
     * @param {Object} options - The options for constructing the URL.
     * @param {string} options.url - The base URL.
     * @param {Object} options.query - The query parameters to include in the URL.
     * @param {Object} config - The configuration options.
     * @param {boolean} config.skipNull - Whether to skip null values in the query parameters.
     * @returns {string} The constructed URL with query parameters.
     */
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    // Redirecting to new url
    router.push(url);
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
}

export default CategoryBox;
