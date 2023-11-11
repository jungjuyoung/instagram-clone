import { User } from "@/model/user";

type Props = Pick<User, "username" | "image"> & {
  size?: string;
  highlight?: boolean;
};

const getContainStyle = (size: string, highlight: boolean): string => {
  const baseStyle = `flex items-center justify-center ${
    size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]"
  } p-[0.1rem] overflow-hidden rounded-full`;
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";

  return `${baseStyle} ${highlightStyle}`;
};

export default function Avatar({
  image,
  username,
  size = "small",
  highlight = false,
}: Props) {
  if (!image) {
    const firstLetterOfUsername = username || "";
    return (
      <div className={getContainStyle(size, highlight)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="flex items-center justify-center w-full h-full rounded-full bg-white">
          <strong className="text-gray-800">
            {firstLetterOfUsername[0].toLocaleUpperCase()}
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
        className="w-full h-full rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
