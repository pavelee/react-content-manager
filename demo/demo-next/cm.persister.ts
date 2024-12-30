"use client";

import { CmHostHandler } from "react-content-manager";

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

export default persister;