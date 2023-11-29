import parseDate from "@/util/date";
import {
  HeartIcon,
  BookmarkIcon,
  HeartFillIcon,
  BookmarkFillIcon,
} from "./ui/icons";
import { useState } from "react";
import ToggleButton from "./ui/ToggleButton";
import { SimplePost } from "@/model/post";

import usePosts from "@/hook/usePosts";
import useMe from "@/hook/useMe";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { setLike } = usePosts();
  const { user, setBookmark } = useMe();
  const bookmarks = user?.bookmarks ?? [];
  // console.log("ActionBar bookmarks",bookmarks);
  const liked = user ? likes.includes(user?.username as string) : false;
  const bookmarked = user ? bookmarks.includes(id) : false;

  const handleLike = (liked: boolean) => {
    user && setLike(post, user?.username as string, liked);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };
  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        {text && (
          <p>
            <span className="font-bold mr-3">{username}</span>
            {text}
          </p>
        )}
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
