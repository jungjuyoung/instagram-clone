import { AuthUser } from "@/model/user";

type AvatarSize = "small" | "medium" | "large" | "xlarge";
type Props = Pick<AuthUser, "username" | "image"> & {
  size?: AvatarSize;
  highlight?: boolean;
};

const getContainerImageSize = (size: AvatarSize = "small"): string => {
  switch (size) {
    case "small":
      return "w-9 h-9";
    case "medium":
      return "w-[48px] h-[48px]";
    case "large":
      return "w-[68px] h-[68px]";
    case "xlarge":
      return "w-[138px] h-[138px]";
    default:
      throw new Error(`UnSupported type size ${size}`);
  }
};
const getContainStyle = (
  size: AvatarSize = "small",
  highlight: boolean
): string => {
  const baseStyle = `flex items-center justify-center ${getContainerImageSize(
    size
  )} p-[0.1rem] overflow-hidden rounded-full`;
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";

  return `${baseStyle} ${highlightStyle}`;
};

export default function Avatar({
  image,
  username,
  size,
  highlight = false,
}: Props) {
  if (!image) {
    const firstLetterOfUsername = username && username[0].toLocaleUpperCase();
    return (
      <div className={getContainStyle(size, highlight)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="flex items-center justify-center w-full h-full rounded-full bg-white">
          <strong
            className={`text-gray-800 ${
              size === "xlarge" ? 'text-2xl' : 'text-base'
            }`}
          >
            {firstLetterOfUsername}
          </strong>
        </div>
      </div>
    );
  }
  return (
    <div className={getContainStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt="user profile image"
        className="w-full h-full rounded-full object-cover border-white border-2"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
