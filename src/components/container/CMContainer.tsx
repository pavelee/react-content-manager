import React from "react";
import { EditableProps, mode } from "../../pages/CMPage";
import { ContainerWrapperId } from "./Form";
import { CMComponent } from "../../index";

export interface ContainerProps extends EditableProps {
  id: string;
  configIds?: ContainerWrapperId[];
  direction?: "row" | "column";
}

const getCssStyles = (props: ContainerProps, mode: mode) => {
  let styles: any = {
    display: "flex",
    gap: "2rem",
  };
  if (props.direction === "column") {
    styles = { ...styles, flexDirection: "column" };
  }
  if (mode === "edit") {
    styles = {
      ...styles,
    };
  }
  return styles;
};
export const CMContainer = (props: ContainerProps) => {
  const { mode = "edit" } = props;

  const styles = getCssStyles(props, mode);

  if (!props.configIds || props.configIds?.length === 0) {
    return null;
  }

  return (
    <div style={styles} className="@container">
      {props.configIds?.map((componentId: any) => {
        return (
          <div
            style={{
              flexGrow: 1,
            }}
            key={componentId.configId}
          >
            {/* @ts-ignore */}
            <CMComponent
              key={componentId.configId}
              mode={mode}
              configId={componentId.configId}
              componentId={componentId.componentId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CMContainer;
