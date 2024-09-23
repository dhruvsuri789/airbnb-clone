"use client";

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

// This is used for Main page listings, Reservations page, Properties page, Trips page and Favorites page
// This is common component for all and when clicked goes to listings/[listingId]/page.tsx
function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}: ListingCardProps) {
  // When clicked on the listing goes to listings/[listingId]/page.tsx
  const router = useRouter();

  // This is used to get country and retrieves a country object by its value which is locationValue
  // locationValue is saved in the database when a new listing is created using the RentModal when you Airbnb you home!
  const { getByValue } = useCountries();
  const country = getByValue(data.locationValue);

  // For cancelling a reservation of your guest and cancel your own trip.
  // Used in Reservations page and Trips page
  // The action callback is different in both cases so it is passed from these two pages.
  // It takes in the reservation id and sends a delete request to the server
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  // The totalPrice is shown on your Trips page where you have reserved a listing and on Reservations page where your guests have reserved your listing
  // Otherwise it shows the price of the listing
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  // The reservationDate is shown on your Trips page where you have reserved the listing and on Reservations page where your guests have reserved your listing
  // Otherwise it returns null
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {country?.region}, {country?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">/night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default ListingCard;
