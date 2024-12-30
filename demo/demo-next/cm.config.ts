import { CmConfig, CmHostHandler } from "react-content-manager";

const cmConfig = new CmConfig();

cmConfig.getComponentGallery().registerComponent({
  id: "cat-facts",
  name: "Fun cat facts",
  public: true,
  componentPath: () => import("@/app/components/cat-facts/Component"),
  formPath: () => import("@/app/components/cat-facts/Form"),
  readProps: () => import("@/app/components/cat-facts/ReadProps"),
  writeProps: () => import("@/app/components/cat-facts/WriteProps"),
  tags: ["content", "alert"],
});
cmConfig.getComponentGallery().registerComponent({
  id: "text-block",
  name: "Text Block",
  public: true,
  componentPath: () => import("@/app/components/text-block/Component"),
  formPath: () => import("@/app/components/text-block/Form"),
  readProps: () => import("@/app/components/text-block/ReadProps"),
  writeProps: () => import("@/app/components/text-block/WriteProps"),
  tags: ["content", "alert"],
});

export default cmConfig;
