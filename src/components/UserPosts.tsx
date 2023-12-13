"use client";
import { ProfileUser } from "@/model/user";
import { useState } from "react";

import { BookmarkIcon, HeartIcon, PostIcon } from "./ui/icons";
import PostGrid from "./PostGrid";
import { CacheKeysContext } from "@/context/CacheKeysContext";

type Props = {
  user: ProfileUser;
};
const tabs = [
  { type: "posts", icon: <PostIcon /> ,title:'User Posts'},
  { type: "saved", icon: <BookmarkIcon className="w-3 h-3" />,title:'Saved Posts' },
  { type: "likes", icon: <HeartIcon className="w-3 h-3" />,title:'Liked Posts' },
];
export default function UserPosts({ user: { username } }: Props) {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center uppercase ">
        {tabs.map(({ type, icon,title }) => (
          <li
            key={type}
            onClick={() => setQuery(type)}
            className={`mx-12 p-4 cursor-pointer ${
              type === query && "font-bold border-t"
            } border-black`}
          >
            <button className="scale-150 md:scale-100" aria-label={title}>{icon}</button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid/>
      </CacheKeysContext.Provider>
    </section>
  );
}
