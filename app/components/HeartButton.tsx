"use client";

import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";
import { useMemo, useOptimistic } from "react";
import useLoginModal from "../hooks/useLoginModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

function HeartButton({ listingId, currentUser }: HeartButtonProps) {
  // To refresh the page after clicking on the favorite button
  const router = useRouter();

  // To open login modal if user is not logged in
  const loginModal = useLoginModal();

  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  const [optimisticUser, toggleOptimistic] = useOptimistic(
    currentUser ?? null,
    (currUser: User | null, listingId: string) => {
      if (!currUser) return null;
      const hasFavorited = currUser.favoriteIds.includes(listingId);
      const updatedFavoriteIds = hasFavorited
        ? currUser.favoriteIds.filter((id) => id !== listingId)
        : [...currUser.favoriteIds, listingId];

      return {
        ...currUser,
        favoriteIds: updatedFavoriteIds,
      };
    }
  );

  const optimisticFavorite = useMemo(() => {
    if (!optimisticUser) return false;
    return optimisticUser.favoriteIds.includes(listingId);
  }, [optimisticUser, listingId]);

  const handleToggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!optimisticUser) return loginModal.onOpen();
    toggleOptimistic(listingId);
    router.refresh();
    toast.success("Success");
    await toggleFavorite(e);
  };

  /* return (
    <button onClick={() => handleToggleFavorite(listingId)}>
      {optimisticUser.favoriteIds.includes(listingId) ? "Unheart" : "Heart"}
    </button>
  ); */

  return (
    <div
      onClick={handleToggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={optimisticFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}

export default HeartButton;
