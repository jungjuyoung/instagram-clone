import { HomeUser } from "@/model/user"
import useSWR from "swr"

const updateBookmark = async (postId: string, bookmark: boolean) => {
  // console.log('updateBookmark postId: ', postId, 'bookmark', bookmark)
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ id: postId, bookmark }),
  }).then(res => res.json());
}
export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>('/api/me')
  // console.log('useSWR/api/me)

  const setBookmark = (postId: string, bookmark: boolean) => {
    if (!user) return
    const { bookmarks } = user;
    // console.log('useMe user', user, 'bookmarks: ', bookmarks)
    const newUser = {
      ...user,
      bookmarks: bookmark ? [...bookmarks, postId] : bookmarks.filter(bookmark => bookmark !== postId)
    }
    return mutate(updateBookmark(postId, bookmark), {
      optimisticData: newUser,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    })
  }

  return {
    user,
    isLoading,
    error,
    setBookmark
  }
}
