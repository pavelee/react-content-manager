import React from "react";
import { EditableProps, containerComponentId } from "../../pages/CMPage";
import { cmComponentGallery } from "../../services/CmComponentGallery";
import { DynamicComponent } from "../DynamicComponent";
import { CMComponentClient } from "./CMComponent.client";
import { ComponentDetailsList } from "../../types";
import { CMComponentFormWrapper } from "./CMComponentForm";
import { getFetcher } from "../../pages/getFetcher";

export interface CMComponentProps extends EditableProps {
  configId: string;
  componentId?: string;
  componentProps?: any;
  initProps?: object;
}

const getAvailableComponentIdList = (): ComponentDetailsList => {
  const c = cmComponentGallery.getPublicComponents();
  const componentIdList: ComponentDetailsList = [];
  // list map
  c.forEach((component) => {
    componentIdList.push({
      id: component.id,
      name: component.name,
      desc: component.desc,
    });
  });
  return componentIdList;
};

export const CMComponent = async (props: CMComponentProps) => {
  const fetcher = getFetcher();
  const data = await fetcher(props.configId);
  const {
    id: componentId,
    componentPath,
    formPath,
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

  let componentIdList: ComponentDetailsList = [];
  if (props.mode === "edit") {
    componentIdList = getAvailableComponentIdList();
  }

  return (
    <CMComponentClient configId={props.configId} componentId={componentId}>
      {props.mode === "edit" && formPath && (
        <CMComponentFormWrapper>
          <DynamicComponent
            componentPath={formPath}
            props={componentProps}
            configId={props.configId}
            componentId={componentId}
            components={componentIdList}
          />
        </CMComponentFormWrapper>
      )}
      <DynamicComponent componentPath={componentPath} props={componentProps} />
    </CMComponentClient>
  );
};
