"use client";
import PostCard from "@/components/PostCard";
import { SimplePost } from "@/model/post";
import { GridLoader } from "react-spinners";
import useSWR from "swr";

export default function PostList() {
  const { isLoading, data: posts, error } = useSWR<SimplePost[]>("/api/post");
  // console.log(posts);
  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridLoader color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-6">
              <PostCard post={post} />{" "}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
