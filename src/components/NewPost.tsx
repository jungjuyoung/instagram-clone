"use client";
import Image from "next/image";
import { AuthUser } from "@/model/user";
import PostUserAvatar from "./PostUserAvatar";
import { FilesIcon } from "./ui/icons";
import Button from "./ui/Button";
import { useState, ChangeEvent, DragEvent, FormEvent } from "react";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  // console.log("NewPost username: ", username, "image: ", image);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      // console.log(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      // console.log(files[0]);
    }
  };
  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      <PostUserAvatar username={username ?? ""} userImage={image ?? ""} />
      <form className="w-full flex flex-col mt-2">
        <input
          className="hidden"
          type="file"
          name="input"
          id="inputUpload"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="inputUpload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className="relative w-full aspect-square">
              <Image
                src={URL.createObjectURL(file)}
                className="object-cover"
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border border-neutral-300"
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
