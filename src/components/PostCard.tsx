import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";

import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";

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
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </section>
  );
}
