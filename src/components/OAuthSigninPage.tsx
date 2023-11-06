"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import google from "../../public/google.png";
import kakao from "../../public/kakao.png";
import naver from "../../public/naver.png";
import Image from "next/image";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function OAuthSigninPage({ providers, callbackUrl }: Props) {
  return (
    <>
      <div className="flex justify-center items-center mt-[15%]">
        <div className="flex-col">
          {Object.values(providers).map(({ name, id }) => (
            <div key={name} className="relative w-[200px] h-[50px] mt-2">
              <button onClick={() => signIn(id, {callbackUrl})}>
                <Image src={`/${id}.png`} alt={name} fill />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
