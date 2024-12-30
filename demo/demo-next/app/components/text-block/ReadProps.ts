import { ComponentProps } from "./Component";

const readProps = async (
  serializedProps?: ComponentProps,
): Promise<ComponentProps> => {
  return {
    text: serializedProps?.text ?? "Default text, edit me!",
  };
};

export default readProps;
