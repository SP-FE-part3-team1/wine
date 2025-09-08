import { ChangeEvent, useState } from "react";

export function useLoginOrSignupInputValue(): [
  {
    email: string;
    password: string;
    nickname?: string;
    passwordConfirmation?: string;
  },
  (e: ChangeEvent<HTMLInputElement>) => void
] {
  const [input, setInput] = useState({
    email: "",
    password: "",
    nickname: "",
    passwordConfirmation: "",
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: [e.target.value],
    }));
  }

  return [input, handleInputChange];
}
