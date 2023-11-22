import { Metadata } from "next";
import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: {
    username: string;
  };
};

// 같은 컴포넌트 안에서 반복되는 무거운 작업을 위해 react에서 제공하는 cache로 최적화
const getUser = cache(async (decodeUsername: string) =>
  getUserForProfile(decodeUsername)
);

export default async function userPage({ params: { username } }: Props) {
  const decodeUsername = decodeURI(username);
  const user = await getUser(decodeUsername);
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

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const decodeUsername = decodeURI(username);
  const user = await getUser(decodeUsername);

  return {
    title: `${user?.name} (@${user?.username}) . Instagram clone Photos`,
    description: `${user?.name}'s all Instagram posts`,
  };
}
