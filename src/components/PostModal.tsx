import { CloseIcon } from "./ui/icons";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};
export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-neutral-500/70 z-50"
      onClick={(e) => {
        // console.log(
        //   "e.target: ",
        //   e.target,
        //   "e.currentTarget: ",
        //   e.currentTarget
        // );
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-8 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className="bg-white w-4/5 h-3/5 max-w-7xl">{children}</div>
    </section>
  );
}
