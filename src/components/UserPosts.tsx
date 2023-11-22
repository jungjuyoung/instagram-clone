"use client";
import { ProfileUser } from "@/model/user";
import { useState } from "react";

import { BookmarkIcon, HeartIcon, PostIcon } from "./ui/icons";
import PostGrid from "./PostGrid";

type Props = {
  user: ProfileUser;
};
const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon className="w-3 h-3" /> },
  { type: "likes", icon: <HeartIcon className="w-3 h-3" /> },
];
export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase ">
        {tabs.map(({ type, icon }) => (
          <li
            key={type}
            onClick={() => setQuery(type)}
            className={`mx-12 p-4 cursor-pointer ${type===query && 'font-bold border-t'} border-black`}
          >
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={username as string} query={query} />
    </section>
  );
}
