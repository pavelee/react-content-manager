import React from "react";
import { EditableProps, containerComponentId } from "../../pages/CMPage";
// import { CMComponentServer } from "./CMComponent.server";
// import { CMComponentClient } from "./CMComponent.client";
import { fetchConfigData } from "../../pages/CMPage";
import { cmComponentGallery } from "../../services/CmComponentGallery";
import { DynamicComponent } from "../DynamicComponent";
import { CMComponentClient } from "./CMComponent.client";
import { ComponentDetailsList } from "../../types";
import { CMComponentFormWrapper } from "./CMComponentForm";

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
}

export const CMComponent = async (props: CMComponentProps) => {
  const data = await fetchConfigData(props.configId);
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

  // if (props.mode === "edit") {
  //   return <CMComponentClient
  //     configId={props.configId}
  //     componentId={props.componentId}
  //     componentProps={data.data}
  //     setProps={'http://localhost:3000/api/configs/'}
  //     formPath={'@/_modules/content/components/news-feed/alert/Form'}
  //   >
  //     <DynamicComponent componentPath={componentPath} props={componentProps} />
  //   </CMComponentClient>;
  // }

  let componentIdList: ComponentDetailsList = [];
  if (props.mode === "edit") {
    componentIdList = getAvailableComponentIdList();
  }

  return (
    <CMComponentClient
      configId={props.configId}
      componentId={componentId}
    >
      {
        props.mode === "edit" && formPath && (
          <CMComponentFormWrapper>
            <DynamicComponent
              componentPath={formPath}
              props={componentProps}
              configId={props.configId}
              componentId={componentId}
              components={componentIdList}
            />
          </CMComponentFormWrapper>
        )
      }
      <DynamicComponent componentPath={componentPath} props={componentProps} />
    </CMComponentClient>
  );

  // if (props.mode === "edit") {
  //   return <CMComponentClient {...props} />;
  // }

  // // @ts-ignore
  // return <CMComponentServer {...props} />;
};
