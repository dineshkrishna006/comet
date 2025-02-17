"use server";
import { auth, currentUser } from "@clerk/nextjs/server";

import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
const Navbar = async () => {
  const user = await currentUser();
  const { userId } = await auth();

  return (
    <div className="bg-gray-300 text-black fixed w-full top-0 left-0 p-4 h-[8vh] flex items-center justify-between">
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
