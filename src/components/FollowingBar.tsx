"use client";
import useSWR from "swr";

export default function FollowingBar({}) {
  const { data, error, isLoading } = useSWR("/api/me");
  console.log("isLoading", isLoading, "data", data, "error", error);
  //2. backend에서 로그인된 사용자 정보를 이용해서 사용자 상세정보를 sanity에서 얻어옴. (followings)
  //3. 컴포넌트에서 followings의 정보를 UI에 보여줌.
  return <div>FollowingBar</div>;
}