import { TextBlockProps } from "./TextBlock";

const readProps = async (serailizedProps?: TextBlockProps): Promise<any> => {
  return {
    limit: serailizedProps?.limit ?? 2,
  };
};

export default readProps;
