import { FaPhotoVideo } from "react-icons/fa";

type Props = {
  className?: string;
};
export default function FilesIcon({ className }: Props) {
  return <FaPhotoVideo className={className || 'w-20 h-20 text-gray-300'} />;
}
