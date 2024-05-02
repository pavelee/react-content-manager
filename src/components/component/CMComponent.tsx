import React from "react";
import { EditableProps, containerComponentId } from "../../pages/CMPage";
// import { CMComponentServer } from "./CMComponent.server";
// import { CMComponentClient } from "./CMComponent.client";
import { fetchConfigData } from "../../pages/CMPage";
import { cmComponentGallery } from "../../services/CmComponentGallery";
import { DynamicComponent } from "../DynamicComponent";
import { CMComponentClient } from "./CMComponent.client";

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

export const CMComponent = async (props: CMComponentProps) => {
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

  if (props.mode === "edit") {
    return <CMComponentClient {...props}>
      <DynamicComponent componentPath={componentPath} props={componentProps} />
    </CMComponentClient>;
  }

  return (
    <DynamicComponent componentPath={componentPath} props={componentProps} />
  );

  // if (props.mode === "edit") {
  //   return <CMComponentClient {...props} />;
  // }

  // // @ts-ignore
  // return <CMComponentServer {...props} />;
};
