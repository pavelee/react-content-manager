export const writeProps = async (props: any) => {
  const data = {
    title: props.title,
    text: props.text,
    link: props.link,
  };
  return data;
};

export default writeProps;
