"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import Modal from "./ui/Modal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";

type Props = {
  post: SimplePost;
  priority: boolean;
};
export default function PostGridCard({ post, priority = false }: Props) {
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;
  const handleOpenPost = () => {
    if (!user) {
      return signIn();
    }
    setOpenModal(true)
  };

  return (
    <div className="relative w-full aspect-square">
      <Image
        src={image}
        alt={`photy by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        className="object-cover"
        onClick={handleOpenPost}
      />
      {openModal && (
        <Modal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} priority={priority} />
          </PostModal>
        </Modal>
      )}
    </div>
  );
}
