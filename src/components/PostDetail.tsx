import { FullPost, SimplePost } from "@/model/post";
import useSWR from "swr";

type Props = {
  post: SimplePost;
};
export default function PostDetail({ post }: Props) {
  const { userImage, username, likes, id, image, createdAt } = post;
  const { data } = useSWR<FullPost>(`/api/post/${id}`);
  const comment = data?.comments;
  console.log(comment);
  return <div>PostDetail</div>;
}
