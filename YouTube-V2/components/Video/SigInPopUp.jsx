"use client";

import { signIn } from "next-auth/react";

const SigInPopUp = ({ title, subtitle }) => {
  async function HandleLogin() {
    signIn("google");
  }
  return (
    <>
      <div className="mb-4 mt-4">{title}</div>
      <p> {subtitle}</p>
      <div
        className="mt-14 -ml-5 hover:bg-blue-500 dark:hover:bg-opacity-30 text-UploadBlue font-bold text-base
           hover:bg-opacity-40 w-28 text-center p-3 rounded-full cursor-pointer"
        onClick={HandleLogin}
      >
        Sign In
      </div>
    </>
  );
};

export default SigInPopUp;
