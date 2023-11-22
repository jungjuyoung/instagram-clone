import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function userPage({ params: { username } }: Props) {
  const decodeUsername = decodeURI(username);
  const user = await getUserForProfile(decodeUsername);
  // console.log("userPage user", decodeUsername);
  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}
