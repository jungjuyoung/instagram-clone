import { client, urlFor } from "./sanity";
import { SimplePost, FullPost } from '@/model/post';

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
  ).then(mapPost)
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

const mapPost = (post: FullPost) => post


const mapPosts = (posts: SimplePost[]) => {
  return posts.map((post: SimplePost) => ({ ...post, likes: post.likes ?? [], image: urlFor(post.image) }))
}

export async function likePost(postId: string, userId: string) {
  return client.patch(postId)//
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference'
      }
    ]).commit({ autoGenerateArrayKeys: true })
}

export async function disLikePost(postId: string, userId: string) {
  return client.patch(postId)//
    .unset([`likes[_ref=="${userId}"]`]).commit()
}

export async function addComment(postId: string, userId: string, comment: string) {
  return client.patch(postId)//
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: {
          _ref: userId,
          _type: 'reference'
        }
      }
    ]).commit({ autoGenerateArrayKeys: true })
}

export async function createPost(userId: string, text: string, file: Blob) {
  // console.log('createPost userId: ', userId, 'text: ', text, 'file.type: ', file.type)
  // file: file, file.type:  image/png 파일포맷의 스트링값.

  return client.assets.upload('image', file)//
    .then(result => {
      return client.create({
        _type: 'post',
        author: { _ref: userId },
        photo: { asset: { _ref: result._id } },
        comments: [{
          comment: text,
          author: { _ref: userId, _type: 'reference' }
        }],
        likes: []
      }, { autoGenerateArrayKeys: true })
    })
}