import { User } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  user: User;
};
export default function SideBar({ user }: Props) {
  const { name, image, username } = user;
  return (
    <>
      <div className="flex items-center">
        {name && (
          <Avatar image={image} username={username} size="medium" highlight />
        )}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <div className="text-sm text-neutral-500 mt-8">
        About . Help . Press . API . Jobs . Privacy . Terms . Location .
        Language
      </div>
      <p className="text-sm font-bold mt-8 text-neutral-500">
        @Copyright Instagram Clone from Meta
      </p>
    </>
  );
}
