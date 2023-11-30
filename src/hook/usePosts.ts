import { SimplePost } from "@/model/post"
import useSWR from "swr"

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
  const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>('/api/post')
  // console.log('useSWR/api/post')

  const setLike = (post: SimplePost, username: string, liked: boolean) => {
    const newPost = { ...post, likes: liked ? [...post.likes, username] : post.likes.filter(p => p !== username) }
    const newPosts = posts?.map(p => p.id === post.id ? newPost : p)
    // console.log('newPosts: ', newPosts)
    // fetch("/api/likes", {
    //   method: "PUT",
    //   body: JSON.stringify({ id: post.id, liked }),
    // })//
    // .then(() => mutate("/api/post"));
    return mutate(updateLike(post.id, liked), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    })
  }
  const postComment = (post: SimplePost, comment: string) => {
    const newPost = { ...post, comments: post.comments + 1 }
    const newPosts = posts?.map(p => p.id === post.id ? newPost : p)
    return mutate(addComment(post.id, comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    })
  }

  return {
    posts,
    isLoading,
    error,
    setLike,
    postComment
  }
}
