import React from "react";
import { DynamicComponent } from "../DynamicComponent";
import {
  cmComponentGallery,
  containerComponentId,
  fetchConfigData,
} from "../../pages/CMPage";
import { CMComponentProps } from "./CMComponent";

export const CMComponentServer = async (props: CMComponentProps) => {
  const data = await fetchConfigData(props.configId);
  const {
    id: componentId,
    componentPath,
    readProps,
  } = cmComponentGallery.getComponent(
    props.componentId ? props.componentId : data.componentId,
  );
  const componentReadProps = await (await readProps()).default(data.data);
  const ip = props.initProps ?? {};
  const componentProps = {
    ...ip,
    ...componentReadProps,
  };
  if (componentId === containerComponentId) {
    componentProps.mode = props.mode;
  }

  return (
    <DynamicComponent componentPath={componentPath} props={componentProps} />
  );
};
