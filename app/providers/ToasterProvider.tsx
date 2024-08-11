"use client";

import { Toaster } from "react-hot-toast";

/* A wrapper for Toaster component */
/* This is done because Toaster component requires atleast one parent Client Component */
/* If we use Toaster component directly inside a Server Component (layout.tsx) it gives an error */
/* This way ToasterProvider can be used inside Server Component */
function ToasterProvider() {
  return <Toaster />;
}

export default ToasterProvider;
