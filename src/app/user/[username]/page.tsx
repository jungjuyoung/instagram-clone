import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function userPage({ params: { username } }: Props) {
  // TODO: 상단구현: 사용자 프로필 화면 구(username, name, 숫자)
  const user = await getUserForProfile(username);
  if (!user) {
    notFound();
  }

  console.log(user);
  // TODO: 하단구현: 3Tab (Post, likes, bookmarks)

  return (
    <>
      <UserProfile user={user} />
    </>
  );
}
