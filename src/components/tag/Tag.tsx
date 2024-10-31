import React from "react";

type TagProps = {
  children: React.ReactNode;
}

export const Tag = (props: TagProps) => {
  const { children } = props;
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: "#fff",
        borderRadius: "2px",
        padding: "0 7px",
        fontSize: "12px",
        lineHeight: "20px",
        marginRight: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    >
      {children}
    </span>
  );
};