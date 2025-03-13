import React from "react";
import { EditableProps, containerComponentId } from "../../pages/CMPage";
import { cmComponentGallery } from "../../services/CmComponentGallery";
import { DynamicComponent } from "../DynamicComponent";
import { CMComponentClient } from "./CMComponent.client";
import { ComponentDetailsList } from "../../types";
import { CMComponentFormWrapper } from "./CMComponentForm";
import { getFetcher } from "../../config/getFetcher";
import { ComponentListCached } from "../../services/ComponentListCached";
import { ComponentService } from "../../services/ComponentService";

export interface CMComponentProps extends EditableProps {
  configId: string;
  componentId?: string;
  componentProps?: any;
  initProps?: object;
}

export const CMComponent = async (props: CMComponentProps) => {
  const fetcher = getFetcher();
  const data = await fetcher(props.configId);
  const component = cmComponentGallery.getComponent(
    props.componentId ? props.componentId : data.componentId,
  );

  const isVisible = await ComponentService.isComponentVisible(component);
  if (isVisible === false) {
    return null;
  }

  const componentReadProps = await (
    await component.readProps()
  ).default(data.data);
  const ip = props.initProps ?? {};
  const componentProps = {
    ...ip,
    ...componentReadProps,
  };

  let componentIdList: ComponentDetailsList = [];
  componentIdList = await ComponentListCached.getAvailableComponentIdList();

  if (component.id === containerComponentId) {
    componentProps.mode = props.mode;
    componentProps.configIds = componentProps.configIds.map(
      (c: { configId: string; componentId: string }) => {
        const cc = componentIdList.find((c2) => c2.id === c.componentId);
        return {
          ...c,
          ...cc,
          active: cc?.active ?? true,
        };
      },
    );
  }

  if (props.mode === "edit") {
    return (
      <CMComponentClient configId={props.configId} componentId={component.id}>
        {component.formPath && (
          <CMComponentFormWrapper>
            <DynamicComponent
              componentPath={component.formPath}
              props={componentProps}
              configId={props.configId}
              componentId={component.id}
              components={componentIdList}
            />
          </CMComponentFormWrapper>
        )}
        <DynamicComponent
          componentPath={component.componentPath}
          props={componentProps}
        />
      </CMComponentClient>
    );
  }

  return (
    <DynamicComponent
      componentPath={component.componentPath}
      props={componentProps}
    />
  );
};
