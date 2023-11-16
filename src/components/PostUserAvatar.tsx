import Avatar from "./Avatar";

type Props = {
  username: string;
  userImage: string;
};
export default function PostUserAvatar({ username, userImage }: Props) {
  return (
    <div className="flex items-center p-2">
      <Avatar username={username} image={userImage} size="medium" highlight />
      <span className="text-gray-900 font-bold ml-2">{username}</span>
    </div>
  );
}
