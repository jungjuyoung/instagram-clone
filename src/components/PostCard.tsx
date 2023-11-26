"use client";

import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";

import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import { useState } from "react";
import Modal from "./ui/Modal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  const [openModal, setOpenModal] = useState(false);

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
      <ActionBar post={post} />
      <CommentForm />
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
