"use client";
import PostCard from "@/components/PostCard";
import { SimplePost } from "@/model/post";
import useSWR from "swr";
import GridSpinner from "./GridSpinner";

export default function PostList() {
  const { isLoading, data: posts, error } = useSWR<SimplePost[]>("/api/post");
  // console.log(posts);
  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner />
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
