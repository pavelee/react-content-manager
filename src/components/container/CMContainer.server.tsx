import React from "react";
import { EditableProps, mode } from "../../pages/CMPage";
import { ContainerWrapperId } from "./Form";
import { CMComponent } from "../..";

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

export const getCssStyles = (props: ContainerProps, mode: mode) => {
  let styles: any = {
    display: "flex",
    gap: "1rem",
  };
  if (props.direction === "column") {
    styles = { ...styles, flexDirection: "column" };
  }
  if (mode === "edit") {
    styles = {
      ...styles,
      padding: "0.25rem",
      border: "2px solid #D1D5DB",
      borderRadius: "0.5rem",
    };
  }
  return styles;
};

export const CMContainerServer = (props: ContainerProps) => {
  const { mode = "edit" } = props;

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
  )
};