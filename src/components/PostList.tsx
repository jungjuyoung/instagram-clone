"use client";
import PostCard from "@/components/PostCard";
import { SimplePost } from "@/model/post";
import useSWR from "swr";

export default function PostList() {
  const { isLoading, data: posts, error } = useSWR<SimplePost[]>("/api/post");
  return (
    <div>
      {/* <PostCard data={data} /> */}
      <ul>
        {posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}
      </ul>
    </div>
  );
}
