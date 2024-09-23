"use client";

import { PuffLoader } from "react-spinners";

/**
 * Loader component that displays a centered PuffLoader spinner.
 */
function Loader() {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <PuffLoader color="red" size={100} />
    </div>
  );
}

export default Loader;
