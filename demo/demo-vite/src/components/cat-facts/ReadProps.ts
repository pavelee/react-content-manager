import { TextBlockProps } from "./Component";

const readProps = async (
  serializedProps?: TextBlockProps,
): Promise<TextBlockProps> => {
  return {
    limit: serializedProps?.limit ?? 2,
  };
};

export default readProps;
