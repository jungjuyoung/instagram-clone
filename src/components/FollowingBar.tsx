"use client";
import { DetailUser } from "@/model/user";
import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";

export default function FollowingBar({}) {
  const { data, error, isLoading } = useSWR<DetailUser>("/api/me");
  const users = data?.following;

  return (
    <section>
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (!users || users.length === 0) && <p>{`you don't have following`}</p>}
      {users && users.length > 0 && (
        <ul>
          {users.map(({ image, username }) => (
            <li key={username}>
              <Link href={`/user/${username}`}>
                <Avatar
                  image={image}
                  username={username}
                  size="medium"
                  highlight
                />
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
