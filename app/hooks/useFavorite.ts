import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  // To refresh the page after clicking on the favorite button
  const router = useRouter();

  // To open login modal if user is not logged in
  const loginModal = useLoginModal();

  // To check if the listing is favorited inside the fovoriteIds array
  const hasFavorited = useMemo(() => {
    const favoriteIds = currentUser?.favoriteIds || [];
    return favoriteIds.includes(listingId);
  }, [currentUser, listingId]);

  // To toggle the favorite status
  // We are using route handlers to mutate the favorite status
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          /* request = await fetch(`/api/favorites/${listingId}`, {
            method: "DELETE",
          }); */
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          /* request = await fetch(`/api/favorites/${listingId}`, {
            method: "POST",
          }); */
        }

        // Awaiting the request
        await request();

        // Refresh the page and show success toast
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, hasFavorited, listingId, loginModal, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
