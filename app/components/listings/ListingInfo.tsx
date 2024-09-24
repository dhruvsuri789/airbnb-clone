"use client";

import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

/* 
The dynamic function is used to dynamically import a module in a Next.js application. This is particularly useful for code-splitting, which helps in reducing the initial load time by splitting the code into smaller chunks that can be loaded on demand.

() => import("../Map") is an arrow function that returns a promise which resolves to the module located at ../Map. This is the module that will be dynamically imported.

ssr: false is a flag that tells Next.js to not do server-side rendering (SSR) of the Map component. This can help in reducing the initial load time of the application.

Setting ssr: false means that this component will not be rendered on the server side. Instead, it will only be rendered on the client side. This is useful for components that rely on browser-specific APIs or need to access the window object, which is not available during server-side rendering.
*/

// Dynamically imports the Map component without server-side rendering (SSR).
const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListingInfoProps {
  user: User;
  category: { icon: IconType; label: string; description: string } | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

function ListingInfo({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}: ListingInfoProps) {
  const { getByValue } = useCountries();

  // Get the coordinates of the location which is the array of latitude and longitude values
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
}

export default ListingInfo;
