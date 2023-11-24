import { AiFillHome } from "react-icons/ai";
type Props = {
  className?: string;
};
export default function HomeFillIcon({ className }: Props) {
  return <AiFillHome className={className || "w-7 h-7"} />
}
