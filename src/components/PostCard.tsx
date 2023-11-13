import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";
import { HeartIcon } from "./ui/icons";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import parseDate from "@/util/date";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  post: SimplePost;
};
export default function PostCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <>
      <div>
        <Avatar username={username} image={image} highlight />
        <span>{username}</span>
      </div>
      <Image
        src={image}
        width={500}
        height={500}
        alt={`photo by ${username}`}
      />
      <div>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div>
        <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        <p>
          <span>{username}</span>
          {text}
        </p>
        <p>{parseDate(createdAt)}</p>
        <form>
          <SmileIcon />
          <input type="text" placeholder="Add a comment" />
          <button>Post</button>
        </form>
      </div>
    </>
  );
}
