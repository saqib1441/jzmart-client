import { FC } from "react";
import Logo from "./Logo";
import NavbarTopImage from "@/assets/navbar-top-image.png";
import Image from "next/image";
import NavbarSearch from "./NavbarSearch";
import Link from "next/link";
import { LuRadar } from "react-icons/lu";
import { FaEnvelopeOpenText, FaRegHeart, FaRegUser } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BiMessageSquareDetail } from "react-icons/bi";
import { TbLogout2, TbMessage2Star, TbWorldSearch } from "react-icons/tb";

const Navbar: FC = () => {
  return (
    <nav>
      {/* Navbar Top Image */}
      <div>
        <Image
          src={NavbarTopImage}
          alt="jz-mart-top-image"
          height={70}
          priority
        />
      </div>
      <div className="container flex items-end justify-between py-5">
        {/* Logo */}
        <Logo />

        {/* Search */}
        <NavbarSearch />

        {/* Links */}
        <div className="flex items-center gap-5">
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
              <DropdownMenuLabel>
                <div>
                  <div className="w-fit mx-auto">
                    <Avatar className="size-14 cursor-pointer">
                      <AvatarImage src="https://asdjfhajskdfhk.com" />
                      <AvatarFallback>
                        <div className="text-2xl">
                          <FaRegUser />
                        </div>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-base">
                    <Link
                      href="/login"
                      className="px-4 border-r hover:text-primary transition-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 hover:text-primary transition-all duration-300"
                    >
                      Signup
                    </Link>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-base w-full"
                >
                  <FaRegUser />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/messages"
                  className="flex items-center gap-2 text-base w-full"
                >
                  <BiMessageSquareDetail />
                  <span>Messages</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/favourite"
                  className="flex items-center gap-2 text-base w-full"
                >
                  <FaRegHeart />
                  <span>Favourites</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/reviews"
                  className="flex items-center gap-2 text-base w-full"
                >
                  <TbMessage2Star />
                  <span>My Reviews</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/myrfq"
                  className="flex items-center gap-2 text-base w-full"
                >
                  <FaEnvelopeOpenText />
                  <span>My RFQ</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/history"
                  className="flex items-center gap-2 text-base w-full"
                >
                  <TbWorldSearch />
                  <span>Browser History</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="select-none cursor-pointer flex items-center gap-2 text-base w-full">
                  <TbLogout2 />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/fav"
            className="flex flex-col items-center gap-1 hover:text-primary transition-all duration-300"
          >
            <span className="text-xl">
              <FaRegHeart />
            </span>
            <span>Favourites</span>
          </Link>
          <Link
            href="/nearme"
            className="flex flex-col items-center gap-1 hover:text-primary transition-all duration-300"
          >
            <span className="text-xl">
              <LuRadar />
            </span>
            <span>Near Me</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
