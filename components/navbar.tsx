"use server";
import { auth } from "@clerk/nextjs/server";

import { SignUpButton, UserButton } from "@clerk/nextjs";
const Navbar = async () => {
  const { userId } = await auth();

  return (
    <div className="bg-black text-white fixed w-full top-0 left-0 p-4 h-[8vh] flex items-center justify-between">
      <div>
        <p className="text-2xl">Markify</p>
      </div>
      <div className="">
        {userId ? <UserButton /> : <SignUpButton>Login</SignUpButton>}
      </div>
    </div>
  );
};

export default Navbar;
