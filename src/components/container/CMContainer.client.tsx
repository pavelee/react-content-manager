"use client";

import React from "react";
import { EditableProps, mode } from "../../pages/CMPage";
import { ContainerWrapperId } from "./Form";
import { CMComponent } from "../..";
import { useCMConfig } from "../../context/CMConfigContext";
import { getCssStyles } from "./CMContainer";

export interface ContainerProps extends EditableProps {
  id: string;
  configIds?: ContainerWrapperId[];
  direction?: "row" | "column";
}

export const getPropsWithDefaults = (props: ContainerProps) => {
  return {
    ...props,
    configIds: props.configIds ?? [],
    direction: props.direction ?? "column",
  };
};

export const CMContainerClient = (props: ContainerProps) => {
  const { mode } = useCMConfig();

  const styles = getCssStyles(props, mode);

  return (
    <div style={styles} className="@container">
      {props.configIds?.map((componentId: any) => {
        return (
          <div
            style={{
              flexGrow: 1,
            }}
            key={componentId.configId}
          >
            <CMComponent
              key={componentId.configId}
              mode={mode}
              configId={componentId.configId}
              componentId={componentId.componentId}
            />
          </div>
        );
      })}
    </div>
  );
};
