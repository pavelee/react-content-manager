export type ComponentProps = {
  text?: string;
};

const Component = async (props: ComponentProps) => {
  const { text } = props;

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="text-black">{text}</div>
    </div>
  );
};

export default Component;
