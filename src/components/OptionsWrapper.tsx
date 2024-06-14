"use client";

import React from "react";
import { Button } from "./button/Button";

interface OptionsWrapperProps {
  options: {
    icon: React.ReactNode;
    callback: () => void;
  }[];
}

export const OptionsWrapper = (props: OptionsWrapperProps) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.25rem",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {props.options.map((option, index) => (
        <Button
          key={index}
          // style={{
          //   backgroundColor: "#D1D5DB",
          //   borderRadius: "9999px",
          //   padding: "0.25rem",
          // }}
          size="small"
          onClick={option.callback}
        >
          {option.icon}
        </Button>
      ))}
    </div>
  );
};
