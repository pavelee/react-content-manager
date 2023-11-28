import React from "react";
import { EditableProps } from "../../pages/CMPage";
import { CMComponentServer } from "./CMComponent.server";
import { CMComponentClient } from "./CMComponent.client";
import { fetchConfigData } from "../../pages/CMPage";

export interface CMComponentProps extends EditableProps {
  configId: string;
  componentId?: string;
  componentProps?: any;
  initProps?: object;
}

export const fetchConfigIds = async (configId: string) => {
  const data = await fetchConfigData(configId);
  if (data?.data?.configIds) {
    return data.data.configIds;
  }
  return [];
};

export const CMComponent = (props: CMComponentProps) => {
  if (props.mode === "edit") {
    return <CMComponentClient {...props} />;
  }

  // @ts-ignore
  return <CMComponentServer {...props} />;
};
