"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FaEnvelopeOpenText, FaRegHeart, FaRegUser } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbLogout2, TbMessage2Star, TbWorldSearch } from "react-icons/tb";
import { useRouter } from "next/navigation";

const NavbarDropdown = () => {
  const router = useRouter();

  const navigate = (url: string) => {
    return router.push(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col items-center gap-1 select-none cursor-pointer hover:text-primary transition-all duration-300">
          <span className="text-xl">
            <FaRegUser />
          </span>
          <span>My Account</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="focus:bg-transparent">
          <div className="w-full">
            <div className="w-fit mx-auto">
              <Avatar className="size-14 cursor-pointer">
                <AvatarImage src="/profile.jpg" />
                <AvatarFallback>
                  <div className="text-2xl">
                    <FaRegUser />
                  </div>
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-center justify-center mt-2 text-base">
              <button
                className="px-4 border-r hover:text-primary transition-all duration-300 cursor-pointer"
                onClick={() => navigate("login")}
              >
                Login
              </button>
              <button
                className="px-4 hover:text-primary transition-all duration-300 cursor-pointer"
                onClick={() => navigate("signup")}
              >
                Signup
              </button>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button
            className="select-none cursor-pointer flex items-center gap-2 text-base w-full"
            onClick={() => navigate("profile")}
          >
            <FaRegUser />
            <span>Profile</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="select-none cursor-pointer flex items-center gap-2 text-base w-full"
            onClick={() => navigate("messages")}
          >
            <BiMessageSquareDetail />
            <span>Messages</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="select-none cursor-pointer flex items-center gap-2 text-base w-full"
            onClick={() => navigate("favourites")}
          >
            <FaRegHeart />
            <span>Favourites</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="select-none cursor-pointer flex items-center gap-2 text-base w-full"
            onClick={() => navigate("reviews")}
          >
            <TbMessage2Star />
            <span>My Reviews</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="select-none cursor-pointer flex items-center gap-2 text-base w-full"
            onClick={() => navigate("rfq")}
          >
            <FaEnvelopeOpenText />
            <span>My RFQ</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="select-none cursor-pointer flex items-center gap-2 text-base w-full"
            onClick={() => navigate("history")}
          >
            <TbWorldSearch />
            <span>Browser History</span>
          </button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button
            className="select-none cursor-pointer flex items-center gap-2 text-base w-full"
            onClick={() => console.log("Logout")}
          >
            <TbLogout2 />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdown;
