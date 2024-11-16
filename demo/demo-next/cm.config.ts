import { CmConfig, CmHostHandler } from "react-content-manager";

const cmConfig = new CmConfig();

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
