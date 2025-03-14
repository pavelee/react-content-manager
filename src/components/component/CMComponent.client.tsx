"use client";

import React from "react";
import { Tag } from "../tag/Tag";
import { useCMConfig } from "../../client/useCMConfig";

type props = {
  children?: React.ReactNode;
  configId: string;
  componentId: string;
};

export const CMComponentClient = (props: props) => {
  const { children } = props;
  const { mode } = useCMConfig();

  if (mode === "edit") {
    return (
      <div
        style={{
          border: "2px dotted lightgray",
          padding: "0.25rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <div>
            <Tag>{props.configId}</Tag>
            <Tag>{props.componentId}</Tag>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return children;
};
