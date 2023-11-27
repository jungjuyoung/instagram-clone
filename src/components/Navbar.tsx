"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  HeartFillIcon,
  HeartIcon,
  HomeFillIcon,
  HomeIcon,
  MessageFillIcon,
  MessageIcon,
  NewFillIcon,
  NewIcon,
  SearchFillIcon,
  SearchIcon,
  SearchInputIcon,
} from "./ui/icons";
import { usePathname } from "next/navigation";
import Image from "next/image";
import instagram from "@/assets/instagram.png";
import arrowdown from "@/assets/arrowdown.png";
import LoginButton from "./ui/LoginButton";
import Avatar from "./Avatar";

const menu = [
  { href: "/", offIcon: <HomeIcon />, onIcon: <HomeFillIcon /> },
  { href: "/search", offIcon: <SearchIcon />, onIcon: <SearchFillIcon /> },
  { href: "/new", offIcon: <NewIcon />, onIcon: <NewFillIcon /> },
  { href: "/message", offIcon: <MessageIcon />, onIcon: <MessageFillIcon /> },
  { href: "/likes", offIcon: <HeartIcon />, onIcon: <HeartFillIcon /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center h-16 px-2">
        <div className="flex">
          <div className="w-28">
            <Link href="/">
              <Image src={instagram} alt="instagram logo" />
            </Link>
          </div>
          <div className="w-3 h-3">
            <Image src={arrowdown} alt="arrow icon" />
          </div>
        </div>
        <div className="hidden sm:flex relative w-72 ">
          <div className="absolute flex items-center text-gray-400 w-6 h-full ml-2">
            <SearchInputIcon />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full h-9 rounded-md bg-[#efefef] pl-8 outline-0"
          />
        </div>
        <div className="">
          <nav>
            <ul className="flex space-x-4 items-center p-4">
              {menu.map(({ href, offIcon, onIcon }) => (
                <li
                  key={href}
                  className={`${
                    href === "/new" ? "sm:flex" : "hidden sm:flex"
                  }`}
                >
                  <Link href={href}>
                    {pathname === href ? onIcon : offIcon}
                  </Link>
                </li>
              ))}
              {user && (
                <li>
                  <Link href={`/user/${user.username}`}>
                    <Avatar
                      image={user.image}
                      username={user.username}
                      highlight
                    />
                  </Link>
                </li>
              )}
              <li>
                {session ? (
                  <LoginButton text="Sign Out" onClick={() => signOut()} />
                ) : (
                  <LoginButton text="Sign in" onClick={() => signIn()} />
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
