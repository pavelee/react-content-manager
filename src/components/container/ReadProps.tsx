// import { fetchConfigIds } from "../CMWrapper";

// import { cmComponentGallery } from "../../pages/CMPage";
import { ContainerWrapperId } from "./Form";

const readProps = async (serailizedProps?: any) => {
  let props: any = {};

  let data: ContainerWrapperId[] = [];
  let configIds = serailizedProps;
  if (serailizedProps?.configIds) {
    configIds = serailizedProps.configIds;
    for (let configId of configIds) {
      if (!configId.component) {
        configId.component = {
          id: configId.componentId,
        };
      }
    }
  }
  if (Array.isArray(configIds)) {
    configIds = configIds.map((configId: any) => {
      data.push({
        configId: configId.configId,
        // component: cmComponentGallery.getComponent(configId.component.id),
      });
    });
    props.configIds = data;
  }

  if (serailizedProps?.direction) {
    props.direction = serailizedProps.direction;
  }

  return props;
};

export default readProps;
