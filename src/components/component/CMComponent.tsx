import React from "react";
import { EditableProps, containerComponentId } from "../../pages/CMPage";
import { cmComponentGallery } from "../../services/CmComponentGallery";
import { DynamicComponent } from "../DynamicComponent";
import { CMComponentClient } from "./CMComponent.client";
import { ComponentDetailsList } from "../../types";
import { CMComponentFormWrapper } from "./CMComponentForm";
import { getFetcher } from "../../config/getFetcher";
import { ComponentService } from "../../services/ComponentService";

export interface CMComponentProps extends EditableProps {
  configId: string;
  componentId?: string;
  componentProps?: any;
  initProps?: object;
}

const getAvailableComponentIdList = async (): Promise<ComponentDetailsList> => {
  const c = cmComponentGallery.getPublicComponents();
  const cArray = Array.from(c);
  const componentIdList: ComponentDetailsList = [];
  // list map
  for (let i = 0; i < cArray.length; i++) {
    const component = cArray[i][1];
    if ((await ComponentService.isComponentVisible(component)) === false) {
      continue;
    }
    componentIdList.push({
      id: component.id,
      name: component.name,
      desc: component.desc,
      active: true,
    });
  }

  return componentIdList;
};

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
  componentIdList = await getAvailableComponentIdList();

  if (component.id === containerComponentId) {
    componentProps.mode = props.mode;
    componentProps.configIds = componentProps.configIds.map(
      (c: { configId: string; componentId: string }) => {
        const cc = componentIdList.find((c2) => c2.id === c.componentId);
        return {
          ...c,
          active: !!cc,
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
