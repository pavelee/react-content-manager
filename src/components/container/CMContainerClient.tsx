'use client'

import React from 'react';
import { useCMConfig } from "../../context/CMConfigContext";
import { useState } from "react";
import { ContainerWrapperId } from "./Form";
import { ContainerProps, getCssStyles, getPropsWithDefaults } from "./CMContainer";
import { CMComponentClient } from "../component/CMComponentClient";

export const CMContainerClient = (props: ContainerProps) => {

  const p = getPropsWithDefaults(props);
  const { mode } = useCMConfig();

  const styles = getCssStyles(p, mode);

  return (
    <div style={styles}>
      {p.configIds?.map((componentId, index) => {
        return (
          <div style={{
            flexGrow: 1,
          }} key={componentId.configId}>
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
