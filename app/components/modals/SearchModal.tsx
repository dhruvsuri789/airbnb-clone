"use client";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

function SearchModal() {
  const router = useRouter();
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // When location chaanges the Map again will be dynamically rendered
  // location is not a dependency but this trick works here
  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  // Go back one step
  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  // Go forward one step
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  // Submit search
  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      bathroomCount,
      roomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    onNext,
    step,
    searchModal,
    location,
    router,
    guestCount,
    bathroomCount,
    roomCount,
    dateRange,
    params,
  ]);

  const actionLabel = useMemo(() => {
    // If at last step return "Search"
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    // If at first step return undefined meaning there is no back button
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  // Making different body content to display based on the Steps
  // This is the default for STEPS.LOCATION
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
}

export default SearchModal;
