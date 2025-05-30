"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

/* Main Airbnb Logo */
function Logo() {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="logo"
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
      src="/images/logo-brand.svg"
    />
  );
}

export default Logo;
