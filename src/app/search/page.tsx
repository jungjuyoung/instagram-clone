import { Metadata } from "next";
import SearchUser from "@/components/SearchUser";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

const SearchPage = () => {
  return <SearchUser />;
};

export default SearchPage;
