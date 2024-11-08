import React from "react";

type Props = {
  usage?: "primary" | "secondary";
  children?: React.ReactNode;
  extraStyle?: React.CSSProperties;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: Props) => {
  const { usage = "secondary" } = props;

  const { extraStyle, ...rest } = props;

  if (usage === "secondary") {
    return (
      <button
        style={{
          backgroundColor: "white",
          color: "#1890ff",
          border: "1px solid #1890ff",
          padding: "0.5rem",
          borderRadius: "0.5rem",
          cursor: "pointer",
          opacity: 0.9,
          boxShadow: "0 0 0.1rem #1890ff",
          ...props.extraStyle,
        }}
        {...rest}
      >
        {props.children}
      </button>
    );
  }
  return (
    <button
      style={{
        backgroundColor: "#1890ff",
        color: "white",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        cursor: "pointer",
        opacity: 0.9,
        boxShadow: "0 0 0.25rem #1890ff",
        ...props.extraStyle,
      }}
      {...rest}
    >
      {props.children}
    </button>
  );
};
