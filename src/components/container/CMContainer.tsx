import React from "react";
import { EditableProps, mode } from "../../pages/CMPage";
import { ContainerWrapperId } from "./Form";
import { CMContainerClient } from "./CMContainer.client";
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
      padding: "0.25rem",
      borderRadius: "0.5rem",
      outline: "1px solid gray",
    };
  }
  return styles;
};

export const CMContainer = (props: ContainerProps) => {
  const { mode = "edit" } = props;

  // if (mode === "edit") {
  //   return <CMContainerClient {...props} />;
  // }

  return <CMContainerServer {...props} />;
};

export default CMContainer;
