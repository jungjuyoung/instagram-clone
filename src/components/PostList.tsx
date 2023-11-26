"use client";
import PostCard from "@/components/PostCard";
import GridSpinner from "./GridSpinner";
import usePosts from "@/hook/usePosts";

export default function PostList() {
  const { isLoading, posts, error } = usePosts();
  // console.log(posts);
  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <GridSpinner color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id} className="mb-6">
              <PostCard post={post} priority={index < 2 ? true : false} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
