"use client";

import { ProfileUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import { SearchInputIcon } from "./ui/icons";
import GridSpinner from "./GridSpinner";

export default function SearchUser() {
  const [keyword, setKeyword] = useState<string>("");
  const {
    isLoading,
    data: users,
    error,
  } = useSWR<ProfileUser[]>(`/api/search/${keyword}`);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col relative max-w-[850px] basis-1/2  h-9">
      <div className="absolute top-1/2 transform -translate-y-1/2 m-auto text-gray-400 ml-2">
        <SearchInputIcon />
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search for username or name"
          autoFocus
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeyword(e.target.value)
          }
          className="w-full h-9 rounded-md bg-[#efefef] pl-8 outline-0"
        />
      </form>
      {error && <p>something goes wrong</p>}
      {isLoading && <GridSpinner />}
      {!isLoading && !error && users?.length === 0 && (
        <p>찾는 사용자가 없습니다.</p>
      )}
      {
        <ul>
          {users &&
            users.map((user) => <li key={user.username}>{user.username}</li>)}
        </ul>
      }
    </div>
  );
}
