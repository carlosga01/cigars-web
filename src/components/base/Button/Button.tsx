import React from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

type Props = {
  text: string;
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ text, variant = "primary", className, ...rest }: Props) {
  return (
    <button className={ButtonVariantStyles[variant] + " " + className} {...rest}>
      {text}
    </button>
  );
}

const ButtonVariantStyles = {
  primary:
    "text-white rounded-lg px-4 py-2 bg-sky-500 enabled:hover:bg-sky-600 font-medium disabled:opacity-75",
  secondary: "text-white",
  tertiary: "text-gray-50 rounded-lg px-4 py-2 bg-transparent font-medium",
};
