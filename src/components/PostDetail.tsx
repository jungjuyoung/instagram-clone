import { SimplePost } from "@/model/post";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import useFullPost from "@/hook/usePost";

type Props = {
  post: SimplePost;
  priority?: boolean;
};
export default function PostDetail({ post, priority = false }: Props) {
  const { userImage, username, id, image } = post;
  const { post: data, postComment } = useFullPost(id);
  const comments = data?.comments;
  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="w-full object-cover aspect-square"
          src={image}
          fill
          sizes="650px"
          priority
          alt={`photo by ${username}`}
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index} className="flex items-center mb-1">
                  <Avatar
                    image={image}
                    username={commentUsername}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2">
                    <span className="font-bold mr-1">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
