import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";
import { Suspense } from "react";
import Loader from "./components/Loader";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homestay | Find a place to stay",
  description: "Find a place to stay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={font.className}>
        {/* Placing it here means toast will be shown here */}
        <ToasterProvider />
        <Suspense fallback={<Loader />}>
          <SearchModal />
        </Suspense>
        <RentModal />
        <RegisterModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
