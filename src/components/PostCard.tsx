import parseDate from "@/util/date";
import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import { HeartIcon, BookmarkIcon, SmileIcon } from "./ui/icons";

type Props = {
  post: SimplePost;
};

export default function PostCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <section className="rounded-md shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar username={username} image={userImage} size="medium" highlight />
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </div>
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        width={500}
        height={500}
        alt={`photo by ${username}`}
      />
      <div className="flex justify-between my-2 px-4">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        <p>
          <span className="font-bold mr-3">{username}</span>
          {text}
        </p>
        <p className="text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
        <form className="flex items-center border-t border-neutral-300">
          <SmileIcon />
          <input
            type="text"
            placeholder="Add a comment"
            className="w-full ml-2 border-none outline-none py-3"
          />
          <button className="font-bold text-sky-500 ml-2">Post</button>
        </form>
      </div>
    </section>
  );
}
