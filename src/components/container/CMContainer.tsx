import React from 'react';
import { EditableProps, mode } from "../../pages/CMPage";
import { CMContainerClient } from "./CMContainerClient";
import { CMContainerServer } from "./CMContainerServer";
import { ContainerWrapperId } from "./Form";

export interface ContainerProps extends EditableProps {
  id: string;
  configIds?: ContainerWrapperId[];
  direction?: 'row' | 'column';
}

export const getPropsWithDefaults = (props: ContainerProps) => {
  return {
    ...props,
    configIds: props.configIds ?? [],
    direction: props.direction ?? 'column'
  }
}

export const getCssClasses = (props: ContainerProps, mode: mode) => {
  let classes = "flex gap-4";
  if (props.direction === "column") {
    classes += " flex-col ";
  }
  if (mode === "edit") {
    classes += " p-1 border-2 border-gray-300 rounded-xl";
  }
  return classes;
}

export const CMContainer = (props: ContainerProps) => {
  const { mode = 'edit' } = props;

  if (mode === 'edit') {
    return <CMContainerClient {...props} />
  }
  
  {/* @ts-ignore */}
  return <CMContainerServer {...props} />
};

export default CMContainer;