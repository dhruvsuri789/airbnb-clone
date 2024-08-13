"use client";

import { User } from "@prisma/client";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { Suspense } from "react";
import Loader from "../Loader";
// import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: User | null;
}

/* 
For Object passing error -> To learn more go to getCurrentUser.ts for this
interface NavbarProps {
  currentUser?: SafeUser | null;
} 
*/

/* Main navbar containing Logo, Search and Menu */
function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Suspense fallback={<Loader />}>
              <Search />
            </Suspense>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Suspense fallback={<Loader />}>
        <Categories />
      </Suspense>
    </div>
  );
}

export default Navbar;
