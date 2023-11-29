"use client";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";
import useMe from "@/hook/useMe";

export default function FollowingBar({}) {
  const { user, error, isLoading } = useMe();
  const users = user?.following;

  return (
    <section className="w-full flex items-center justify-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] relative z-0 overflow-x-auto">
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`you don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link
              href={`/user/${username}`}
              className="flex flex-col items-center w-20"
              key={username}
            >
              <Avatar
                image={image}
                username={username}
                size="large"
                highlight
              />
              <p className="w-full text-center text-sm text-ellipsis overflow-hidden">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
