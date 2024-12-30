import { ComponentProps } from "./Component";

export const writeProps = async (props: ComponentProps) => {
  const data = {
    text: props.text,
  };
  return data;
};

export default writeProps;
