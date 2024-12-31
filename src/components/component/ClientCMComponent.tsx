"use client";

import React from "react";
import { useEffect, useState } from "react";
import { CMComponent, CMComponentProps } from "./CMComponent";

/**
 * Component that asynchronously loads a CMComponent when using client side rendering.
 * Use this instead of CMComponent when you develop with Vite or next.js page that is set as client side rendering.
 * @param props
 * @returns
 */
export const ClientCMComponent = (props: CMComponentProps) => {
  const { configId, componentId, mode } = props;

  const [component, setComponent] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    CMComponent({ configId, componentId, mode })
      .then((element) => {
        if (isMounted) {
          setComponent(element);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [configId, componentId, mode]);

  if (error) {
    throw new Error(error);
  }

  return <>{component}</>;
};
