import { User } from "@/model/user";

type Props = {
  user: User;
  size: string;
  highlight?: boolean;
};

const getContainStyle = (size: string, highlight: boolean): string => {
  const baseStyle =
    "flex items-center justify-center w-9 h-9 p-[0.1rem] overflow-hidden rounded-full";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const sizeStyle = size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]";

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
};

export default function Avatar({
  user,
  size = "small",
  highlight = false,
}: Props) {
  const { username, image } = user;
  if (!image) {
    const firstLetterOfUsername = username || "";
    return (
      <div className={getContainStyle(size, highlight)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="flex items-center justify-center w-full h-full rounded-full bg-white">
          <strong>{firstLetterOfUsername[0].toLocaleUpperCase()}</strong>
        </div>
      </div>
    );
  }
  return (
    <div className={getContainStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        alt="user profile image"
        className={getContainStyle(size, highlight)}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
