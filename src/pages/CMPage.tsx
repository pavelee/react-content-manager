import React from "react";
import { CmConfig } from "../services/CmConfig";
import { EditPage } from "./EditPage";
import { ViewPage } from "./ViewPage";
import { Skeleton } from "../components/Skeleton";

export type mode = "edit" | "view";

export interface EditableProps {
  mode: mode;
}

interface Props {
  children: React.ReactNode;
  mode: mode;
}

const getCmConfig = () => {
  delete require.cache[require.resolve("cm.config.ts")];
  return require("cm.config.ts").default as CmConfig;
};

export const cmConfig = getCmConfig();
export const containerComponentId = "container";
export const cmComponentGallery = getCmConfig().getComponentGallery();
cmComponentGallery.registerComponent({
  id: containerComponentId,
  name: "Container",
  public: false,
  componentPath: () => import("../components/container/CMContainer"),
  formPath: () => import("../components/container/Form"),
  readProps: () => import("../components/container/ReadProps"),
  writeProps: () => import("../components/container/WriteProps"),
  tags: ["layout"],
});

export const fetchConfigData = cmConfig.getFetcher();

export const persistConfigData = cmConfig.getPersister();

export const CMProvider = (props: Props) => {
  const isEditMode = props.mode === "edit";

  if (isEditMode) {
    return <EditPage mode={props.mode}>{props.children}</EditPage>;
  }
  return <ViewPage>{props.children}</ViewPage>;
};
