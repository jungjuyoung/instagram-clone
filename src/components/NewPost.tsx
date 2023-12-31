"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, DragEvent, FormEvent, useRef } from "react";

import { AuthUser } from "@/model/user";
import GridSpinner from "@/components/GridSpinner";
import PostUserAvatar from "./PostUserAvatar";
import { FilesIcon } from "./ui/icons";
import Button from "./ui/Button";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  // console.log("NewPost username: ", username, "image: ", image);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      // console.log(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    // console.log('e.tyep: ' ,e.type);
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    // console.log('e.type: ',e.type)
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    // console.log('e.type: ',e.type)
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      // console.log(files[0]);
    }
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");
    // console.log("handleSubmit textRef:", textRef);

    fetch("/api/post", { method: "POST", body: formData }) //
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString())) //
      .finally(() => setLoading(false));
  };
  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      {loading && (
        <div className="absolute inset-0 z-10 text-center pt-[30%] bg-sky-500/20">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <PostUserAvatar username={username ?? ""} userImage={image ?? ""} />
      <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
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
          ref={textRef}
        ></textarea>
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
