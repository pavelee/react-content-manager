import React from 'react';
import { CMComponentServer } from "../component/CMComponentServer";
import { ContainerProps, getCssClasses, getPropsWithDefaults } from "./CMContainer";

export const CMContainerServer = async (props: ContainerProps) => {

  const p = getPropsWithDefaults(props);
  const classes = getCssClasses(p, 'view');

  return (
    <div className={classes}>
      {props.configIds?.map((componentId: any) => {
        return (
          <div className="grow" key={componentId.configId}>
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
