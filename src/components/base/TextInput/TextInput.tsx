import React from "react";

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextInput({ className, ...rest }: Props) {
  return (
    <input
      type="text"
      name="name"
      id="name"
      className={
        "mt-1 py-2 px-3 block w-full border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md bg-gray-100 placeholder:text-gray-500 text-sm" +
        " " +
        className
      }
      {...rest}
    />
  );
}
