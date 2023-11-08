type Props = {
  user: {
    image?: string | null;
    username: string;
  };
};

export default function Avatar({ user }: Props) {
  const image = user?.image;
  console.log("Avatar user", user?.image);
  if (!image) {
    const firstLetterOfUsername = user?.username;
    return (
      <div className="flex items-center justify-center w-9 h-9 p-[0.2rem] rounded-full overflow-hidden bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <div className="flex items-center justify-center w-full h-full rounded-full bg-white">
          <strong>{firstLetterOfUsername[0].toLocaleUpperCase()}</strong>
        </div>
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image ?? undefined}
        alt="user profile image"
        className="rounded-full p-[0.2rem] object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
