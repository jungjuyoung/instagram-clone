"use client";

import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};
const options = {
  fetcher: (url: string) => fetch(url).then((res) => res.json()),
};
export default function SWRContext({ children }: Props) {
  return <SWRConfig value={options}>{children}</SWRConfig>;
}
