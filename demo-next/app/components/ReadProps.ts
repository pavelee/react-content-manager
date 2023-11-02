const readProps = async (serailizedProps?: any): Promise<any> => {
  return {
    title: serailizedProps?.title ?? "domyślny tytuł",
    text: serailizedProps?.text ?? "domyślny test",
    link: serailizedProps?.link ?? "domyślny link",
  };
};

export default readProps;
