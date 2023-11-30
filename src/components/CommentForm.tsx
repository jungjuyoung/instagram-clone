import { FormEvent, useState } from "react";
import { SmileIcon } from "./ui/icons";

type Props = {
  onPostComment: (comment: string) => void;
};
export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;
  const handleSummit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };
  return (
    <form
      onSubmit={handleSummit}
      className="flex items-center border-t border-neutral-300 px-4"
    >
      <SmileIcon />
      <input
        type="text"
        placeholder="Add a comment"
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full ml-2 border-none outline-none py-3"
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ${
          buttonDisabled ? "text-gray-500" : "text-sky-500"
        } ml-2`}
      >
        Post
      </button>
    </form>
  );
}
