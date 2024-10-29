import { ContainerProps } from "./CMContainer";

export const writeProps = async (props: ContainerProps) => {
  let data: any = {};

  if (props.configIds) {
    const configIds = props.configIds.map((configId) => {
      return {
        configId: configId.configId,
        // componentId: configId.component.id,
      };
    });
    data.configIds = configIds;
  }
  if (props.direction) {
    data.direction = props.direction;
  }

  return data;
};

export default writeProps;
