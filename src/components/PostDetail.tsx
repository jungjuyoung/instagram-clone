import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import useSWR from "swr";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";
import useFullPost from "@/hook/usePost";
import useMe from "@/hook/useMe";

type Props = {
  post: SimplePost;
  priority?: boolean;
};
export default function PostDetail({ post, priority = false }: Props) {
  const { userImage, username, likes, id, image, createdAt } = post;
  const { post: data, postComment } = useFullPost(id);
  const { user } = useMe();
  const comments = data?.comments;

  console.log("PostDetail comments: ", comments);
  const handlePostComment = (comment: string) => {
    user &&
      postComment({
        comment,
        username: user.username as string,
        image: user.image,
      });
  };
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
        <ActionBar post={post} />
        <CommentForm onPostComment={handlePostComment} />
      </div>
    </section>
  );
}
