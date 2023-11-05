import React from "react";
type Props = {
  text: string;
  onClick: () => void;
};

function LoginButton({ text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-white text-[#0095f6] rounded-sm font-bold  p-[0.3rem] hover:opacity-90 transition-pacity"
    >
      {text}
    </button>
  );
}

export default LoginButton;
