import { client, urlFor } from "./sanity";
import { SimplePost } from '@/model/post';

const SimplePostProjection = `
  ...,
  "username": author->username,
  "userImage":author->image,
  "image":photo,
  "likes":likes[]->username,
  "text":comments[0].comment,
  "comments":count(comments),
  "id":_id,
  "createdAt": _createdAt
`

export default async function getFollowingPostsOf(username: string) {
  return client.fetch(
    `*[_type == "post" && author->username == "${username}"
        || author._ref in *[_type == "user" && username == "${username}"].following[]._ref] | order(_createdAt desc){
          ${SimplePostProjection}
        }`
  ).then(mapPosts)
}

export async function getPost(id: string) {
  return client.fetch(
    `*[_type == "post" && _id == "${id}"][0]{
      ...,
      "username": author->username,
      "userImage":author->image,
      "image":photo,
      "likes":likes[]->username,
      comments[]{
        comment,"username": author->username, "image": author->image
      },
      "id":_id,
      "createdAt":_createdAt
    }`
  ).then(mapPosts)
}

export async function getPostsOf(username: string) {
  return client.fetch(
    `*[_type=="post" && author->username=="${username}"]|order(_createdAt desc){
      ${SimplePostProjection}
    }`
  ).then(mapPosts)
}
export async function getLikedPostsOf(username: string) {
  return client.fetch(
    `*[_type=="post" && "${username}" in likes[]->username]|order(_createdAt desc){
      ${SimplePostProjection}
    }`
  ).then(mapPosts)
}
export async function getSavedPostsOf(username: string) {
  return client.fetch(
    `*[_type=="post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
    |order(_createdAt desc){
      ${SimplePostProjection}
    }`
  ).then(mapPosts)
}


const mapPosts = (posts: SimplePost[]) => {
  return posts.map((post: SimplePost) => ({ ...post, image: urlFor(post.image) }))
}
