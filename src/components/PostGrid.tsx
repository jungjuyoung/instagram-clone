import GridSpinner from "@/components/GridSpinner";
import PostGridCard from "@/components/PostGridCard";
import usePosts from "@/hook/usePosts";

export default function PostGrid() {
  const { posts, isLoading, error } = usePosts();
  // console.log("posts", posts);
  return (
    <div className="w-full text-center">
      {isLoading && <GridSpinner />}
      <ul className="grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
