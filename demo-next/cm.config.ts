import { CmConfig } from "react-content-manager";

const fetcher = async (componentId: string): Promise<any> => {
  return {};
};

const persister = async (
  configId: string,
  componentId: string,
  data: any,
) => {};

const cmConfig = new CmConfig(fetcher, persister);

cmConfig.getComponentGallery().registerComponent({
  id: "text-block",
  name: "Text Block",
  public: true,
  componentPath: () => import("@/app/components/TextBlock"),
  formPath: () => import("@/app/components/Form"),
  readProps: () => import("@/app/components/ReadProps"),
  writeProps: () => import("@/app/components/WriteProps"),
  tags: ["content", "alert"],
});

export default cmConfig;
