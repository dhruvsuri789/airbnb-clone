"use client";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser?: User | null;
}

/* Containing main button and Menu buttons for Login and Sign up as MenuItem Components*/
function UserMenu({ currentUser }: UserMenuProps) {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    //Open rent modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Rent your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    // Close the menu
                    toggleOpen();
                    router.push("/trips");
                  }}
                  label="My trips"
                />
                <MenuItem
                  onClick={() => {
                    // Close the menu
                    toggleOpen();
                    router.push("/favorites");
                  }}
                  label="My favourites"
                />
                <MenuItem
                  onClick={() => {
                    // Close the menu
                    toggleOpen();
                    router.push("/reservations");
                  }}
                  label="My reservations"
                />
                <MenuItem
                  onClick={() => {
                    // Close the menu
                    toggleOpen();
                    router.push("/properties");
                  }}
                  label="My properties"
                />
                <MenuItem
                  onClick={() => {
                    // Close the menu
                    toggleOpen();
                    rentModal.onOpen();
                  }}
                  label="Rent my home"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    // Close the menu
                    toggleOpen();
                    signOut();
                  }}
                  label="Logout"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    // Close the menu
                    toggleOpen();
                    loginModal.onOpen();
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    // Close the menu
                    toggleOpen();
                    registerModal.onOpen();
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
