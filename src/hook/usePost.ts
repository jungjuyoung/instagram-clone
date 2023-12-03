import { useCallback } from "react";
import { FullPost, Comment } from "@/model/post"
import useSWR, { useSWRConfig } from "swr"

const addComment = async (id: string, comment: string) => {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then(res => res.json());
}
export default function useFullPost(postId: string) {
  const { data: post, isLoading, error, mutate } = useSWR<FullPost>(`/api/post/${postId}`)
  const { mutate: globalMutate } = useSWRConfig()
  // console.log('useFullPost hooks post: ', post)
  const postComment = useCallback((comment: Comment) => {
    if (!post) return
    const newPost = { ...post, comments: [...post.comments, comment] }

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    }).then(() => globalMutate('/api/post'))
  }, [post, globalMutate, mutate])

  return {
    post,
    isLoading,
    error,
    postComment
  }
}
