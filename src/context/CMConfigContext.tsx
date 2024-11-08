"use client";

import React, { useCallback } from "react";
import { createContext, useState } from "react";
import { getPersister } from "../pages/getPersister";
import { notification } from "antd";
import { Translator } from "../pages/Translator";

export interface CMConfigContextProps {
  mode: "edit" | "view";
  setMode: (mode: "edit" | "view") => void;
  isSaving: boolean;
  saveChange: (
    configId: string,
    componentId: string,
    props: any,
    onSuccess?: () => void,
    onError?: (error: unknown) => void,
  ) => Promise<void>;
}

export const CMConfigContext = createContext<CMConfigContextProps | undefined>({
  mode: "view",
  setMode: () => {},
  isSaving: false,
  saveChange: async (configId: string, componentId: string, props: any) => {},
});

interface CMConfigContextProviderProps {
  mode: "edit" | "view";
  children: React.ReactNode;
}

export const CMConfigContextProvider = (
  props: CMConfigContextProviderProps,
) => {
  const [mode, setMode] = useState<"edit" | "view">(props.mode);
  const [isSaving, setIsSaving] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  let nextRouter = null;
  // @TODO remove it or load it a way that it will support Vite
  nextRouter = require("next/navigation").useRouter();

  const setModeHandler = useCallback(
    (mode: "edit" | "view") => {
      setMode(mode);
    },
    [setMode],
  );

  const saveChange = useCallback(
    async (
      configId: string,
      componentId: string,
      props: any,
      onSuccess?: () => void,
      onError?: (error: unknown) => void,
    ) => {
      try {
        setIsSaving(true);
        const persister = getPersister();
        await persister(configId, componentId, props);
        if (nextRouter) {
          nextRouter.refresh();
        }
        if (onSuccess) {
          onSuccess();
        } else {
          api.success({
            message: Translator.translate("CHANGES_SAVED"),
          });
        }
      } catch (error: unknown) {
        if (onError) {
          onError(error);
        } else {
          if (error instanceof Error) {
            console.error(error);
            api.error({
              message: Translator.translate("ERROR"),
              description: error.message,
            });
          }
          throw error;
        }
      } finally {
        setIsSaving(false);
      }
    },
    [nextRouter],
  );

  const contextValue: CMConfigContextProps = {
    mode: mode,
    setMode: setModeHandler,
    isSaving: isSaving,
    saveChange: saveChange,
  };

  return (
    <CMConfigContext.Provider value={contextValue}>
      {contextHolder}
      {props.children}
    </CMConfigContext.Provider>
  );
};
