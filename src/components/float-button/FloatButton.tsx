import React from "react";

type FloatButtonProps = {
  onClick: () => void;
  children?: React.ReactNode;
}

export const FloatButton = (props: FloatButtonProps) => {
  const { onClick, children } = props;
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        top: 150,
        right: 20,
        backgroundColor: "#1890ff",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  )
}