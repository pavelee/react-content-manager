import React from "react";
import { CMComponentServer } from "../component/CMComponent.server";
import {
  ContainerProps,
  getCssStyles,
  getPropsWithDefaults,
} from "./CMContainer";

export const CMContainerServer = async (props: ContainerProps) => {
  const p = getPropsWithDefaults(props);
  const styles = getCssStyles(p, "view");

  return (
    <div style={styles}>
      {props.configIds?.map((componentId: any) => {
        return (
          <div
            style={{
              flexGrow: 1,
            }}
            key={componentId.configId}
          >
            {/* @ts-ignore */}
            <CMComponentServer
              key={componentId.configId}
              mode={p.mode}
              configId={componentId.configId}
              componentId={componentId.componentId}
            />
          </div>
        );
      })}
    </div>
  );
};
