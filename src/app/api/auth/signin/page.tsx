import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OAuthSigninPage from "@/components/OAuthSigninPage";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to Instagram clone site",
};

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};
export default async function SigninPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);
  // console.log("signin page session", session);
  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};

  return (
    <OAuthSigninPage providers={providers} callbackUrl={callbackUrl ?? "/"} />
  );
}
