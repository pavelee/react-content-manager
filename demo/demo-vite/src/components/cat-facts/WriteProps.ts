import { TextBlockProps } from "./Component";

export const writeProps = async (props: TextBlockProps) => {
  const data = {
    limit: props.limit ?? 2,
  };
  return data;
};

export default writeProps;
