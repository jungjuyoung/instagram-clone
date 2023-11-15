import { SmileIcon } from "./ui/icons";

export default function CommentForm() {
  return (
    <form className="flex items-center border-t border-neutral-300 px-4">
      <SmileIcon />
      <input
        type="text"
        placeholder="Add a comment"
        className="w-full ml-2 border-none outline-none py-3"
      />
      <button className="font-bold text-sky-500 ml-2">Post</button>
    </form>
  );
}
