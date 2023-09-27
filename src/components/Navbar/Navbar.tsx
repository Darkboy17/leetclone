import { authModalState } from "@/atoms/authModalAtom";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useSetRecoilState } from "recoil";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, isOpen: true }));
  };

  return (
    <div className="flex items-left justify-between sm:px-12 px-2 md:px 24">
      <Link href="/" className="flex items-center justify-center h-20" style={{ transform: 'translateY(14px)' }}>
  <Image src="/leetclone_final_removebg.png" alt="LeetClone" height={150} width={200} />
</Link>
      <div className="flex items-center">
        <button
          className="bg-brand-orange text-white px-2 py-1 smm:px-4 rounded-md text-sm font-medium
            hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent transition duration-700 ease-in-out"
          onClick={handleClick}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Navbar;
