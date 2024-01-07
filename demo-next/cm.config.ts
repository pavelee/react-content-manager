import { CmConfig, CmHostHandler } from "react-content-manager";

const fetcher = async (componentId: string): Promise<any> => {
  let host = CmHostHandler.getHost();
  const data = await fetch(`${host}/api/store?configId=${componentId}`);
  const json = await data.json();
  return json;
};

const persister = async (configId: string, componentId: string, data: any) => {
  const host = CmHostHandler.getHost();
  const response = await fetch(`${host}/api/store`, {
    method: "POST",
    body: JSON.stringify({
      configId: configId,
      componentId: componentId,
      data: data,
    }),
  });
};

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
