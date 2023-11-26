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
import { useSession } from "next-auth/react";

import usePosts from "@/hook/usePosts";

type Props = {
  post: SimplePost;
};

export default function ActionBar({ post }: Props) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const user = session?.user;
  const liked = user ? likes.includes(user?.username as string) : false;
  const [bookmarked, setBookmarked] = useState(false);
  const { setLike } = usePosts();
  const handleLike = (liked: boolean) => {
    if (user) {
      setLike(post, user?.username as string, liked);
    }
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartIcon />}
          offIcon={<HeartFillIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkIcon />}
          offIcon={<BookmarkFillIcon />}
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
