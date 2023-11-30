"use client";

import { SimplePost } from "@/model/post";
import Image from "next/image";

import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import { useState } from "react";
import Modal from "./ui/Modal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import usePosts from "@/hook/usePosts";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, text, comments } = post;
  const [openModal, setOpenModal] = useState(false);
  const {postComment} = usePosts();

  const handlePostComment = (comment: string) => {
    postComment(post, comment);
  };

  return (
    <section className="rounded-md shadow-md border border-gray-200">
      <PostUserAvatar userImage={userImage} username={username} />
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        width={500}
        height={500}
        priority
        alt={`photo by ${username}`}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post}>
        <p>
          <span className="font-bold mr-3">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="font-bold my-2 text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`view all ${comments} comments`}</button>
        )}
      </ActionBar>
      <CommentForm onPostComment={handlePostComment} />
      {openModal && (
        <Modal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} priority={priority} />
          </PostModal>
        </Modal>
      )}
    </section>
  );
}
