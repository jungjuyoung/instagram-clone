"use client";

import { AuthUser } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import { FilesIcon } from "./ui/icons";
import Button from "./ui/Button";
import { useState } from "react";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  // console.log("NewPost username: ", username, "image: ", image);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  return (
    <section>
      <PostUserAvatar username={username ?? ""} userImage={image ?? ""} />
      <form>
        <input
          className="hidden"
          type="file"
          name="input"
          id="inputUpload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          htmlFor="inputUpload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FilesIcon />
          <p>Drag and Drop your image here or click</p>
        </label>
        <textarea
          name="text"
          id="inputText"
          required
          rows={10}
          placeholder="Write a caption..."
        ></textarea>
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}