"use client";

import { Toaster } from "react-hot-toast";
import NextNProgress from "nextjs-progressbar";

const ClientProvider = () => {
  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <NextNProgress
        color="#FF0000"
        startPosition={0.3}
        stopDelayMs={200}
        height={1}
        showOnShallow={true}
      />
    </>
  );
};

export default ClientProvider;
