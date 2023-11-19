"use client";

import { SearchUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { SearchInputIcon } from "./ui/icons";
import GridSpinner from "./GridSpinner";
import UserCard from "./UserCard";
import useDebounce from "@/hook/useDebounce";

export default function SearchUser() {
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    isLoading,
    data: users,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <section className="flex flex-col items-center w-full basis-1/2 max-w-[550px] my-4">
      <form onSubmit={onSubmit} className="w-full mb-4">
        <input
          type="text"
          placeholder="Search for username or name"
          autoFocus
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          className="w-full h-12 text-xl border border-gray-300 pl-8 outline-0"
        />
      </form>
      {error && <p>something goes wrong</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && (
        <p>찾는 사용자가 없습니다.</p>
      )}
      {
        <ul className="w-full p-4">
          {users &&
            users.map((user) => (
              <li key={user.username}>
                <UserCard user={user} />
              </li>
            ))}
        </ul>
      }
    </section>
  );
}
