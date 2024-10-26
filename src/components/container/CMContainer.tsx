import React from "react";
import { EditableProps, mode } from "../../pages/CMPage";
import { ContainerWrapperId } from "./Form";
import { CMContainerServer } from "./CMContainer.server";

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
    gap: "2rem",
  };
  if (props.direction === "column") {
    styles = { ...styles, flexDirection: "column" };
  }
  if (mode === "edit") {
    styles = {
      ...styles,
      // padding: "0.25rem",
      // border: "2px solid #D1D5DB",
      // borderRadius: "0.5rem",
    };
  }
  return styles;
};

export const CMContainer = (props: ContainerProps) => {
  return <CMContainerServer {...props} />;
};

export default CMContainer;
