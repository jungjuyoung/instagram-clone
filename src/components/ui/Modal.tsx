import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function Modal({ children }: Props) {
  if (typeof window === "undefined") return null;
  const el = document.getElementById("portal") as Element;

  return ReactDOM.createPortal(children, el);
}
