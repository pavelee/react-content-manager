import React from "react";
import { EditPage } from "./EditPage";
import { ViewPage } from "./ViewPage";
import { getCmConfig } from "./getCmConfig";
import "@ant-design/v5-patch-for-react-19";
import type { ProviderConfig } from "../types";

export type mode = "edit" | "view";

export interface EditableProps {
  mode: mode;
}

interface Props {
  children: React.ReactNode;
  mode: mode;
  config?: ProviderConfig;
}

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

export const CMProvider = (props: Props) => {
  const isEditMode = props.mode === "edit";

  if (isEditMode) {
    return (
      <EditPage
        mode={props.mode}
        isPreviewOnInit={cmConfig.getPreviewOnInit()}
        config={props.config}
      >
        {props.children}
      </EditPage>
    );
  }
  return <ViewPage>{props.children}</ViewPage>;
};
