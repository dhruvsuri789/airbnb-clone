"use client";

/* 
ReactNode Represents all of the things React can render. -> Thats why good for children prop

Where ReactElement only represents JSX, ReactNode represents everything that can be rendered.
*/

interface ContainerProps {
  children: React.ReactNode;
}

/* Container component to keep everything in the middle with proper padding */
function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
}

export default Container;
