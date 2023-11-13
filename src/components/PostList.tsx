"use client";
import PostCard from "@/components/PostCard";
import useSWR from "swr";

export default function PostList() {
  const { isLoading, data, error } = useSWR("/api/post");
  console.log(data);
  return (
    <div>
      <PostCard />
    </div>
  );
}
