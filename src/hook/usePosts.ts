import { useCallback } from "react";
import { SimplePost, Comment } from "@/model/post"
import useSWR from "swr"
import { useCacheKeys } from "@/context/CacheKeysContext";

const updateLike = async (id: string, liked: boolean) => {
  // console.log('updateLike id: ', id, 'liked', liked)
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, liked }),
  }).then(res => res.json());
}
const addComment = async (id: string, comment: string) => {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then(res => res.json());
}
export default function usePosts() {
  const cacheKeys = useCacheKeys()
  console.log(cacheKeys.postsKey)
  const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>(cacheKeys.postsKey)
  // console.log('useSWR/api/post')

  const setLike = useCallback((post: SimplePost, username: string, liked: boolean) => {
    const newPost = { ...post, likes: liked ? [...post.likes, username] : post.likes.filter(p => p !== username) }
    const newPosts = posts?.map(p => p.id === post.id ? newPost : p)
    return mutate(updateLike(post.id, liked), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    })
  }, [posts, mutate]);

  const postComment = useCallback((post: SimplePost, comment: Comment) => {
    const newPost = { ...post, comments: post.comments + 1 }
    const newPosts = posts?.map(p => p.id === post.id ? newPost : p)
    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    })
  }, [posts, mutate])

  return {
    posts,
    isLoading,
    error,
    setLike,
    postComment
  }
}
