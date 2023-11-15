"use client";

import { SimplePost } from "@/model/post";
import Avatar from "./Avatar";
import Image from "next/image";

import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import { useState } from "react";
import Modal from "./ui/Modal";
import PostModal from "./PostModal";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="rounded-md shadow-md border border-gray-200">
      <div className="flex items-center p-2">
        <Avatar username={username} image={userImage} size="medium" highlight />
        <span className="text-gray-900 font-bold ml-2">{username}</span>
      </div>
      <Image
        className="w-full object-cover aspect-square"
        src={image}
        width={500}
        height={500}
        priority={priority}
        alt={`photo by ${username}`}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
      {openModal && (
        <Modal>
          <PostModal onClose={() => setOpenModal(false)}>
            포스트 상세페이지 모달!!!
          </PostModal>
        </Modal>
      )}
    </section>
  );
}
