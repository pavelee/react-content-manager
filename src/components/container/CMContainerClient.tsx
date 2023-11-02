'use client'

import React from 'react';
import { useCMConfig } from "../../context/CMConfigContext";
import { useState } from "react";
import { ContainerWrapperId } from "./Form";
import { ContainerProps, getCssClasses, getPropsWithDefaults } from "./CMContainer";
import { CMComponentClient } from "../component/CMComponentClient";

export const CMContainerClient = (props: ContainerProps) => {

  const p = getPropsWithDefaults(props);
  const { mode } = useCMConfig();

  const classes = getCssClasses(p, mode);

  return (
    <div className={classes}>
      {p.configIds?.map((componentId, index) => {
        return (
          <div className="grow" key={componentId.configId}>
            <CMComponentClient
              key={componentId.configId}
              configId={componentId.configId}
              componentId={componentId.component.id}
              mode={mode}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CMContainerClient;
