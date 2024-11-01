"use client";

import React, { useCallback } from "react";
import { createContext, useContext, useState } from "react";
import { getPersister } from "../pages/getPersister";
// import { cmComponentGallery, persistConfigData } from "../pages/CMPage";
// import { cmComponentGallery, persistConfigData } from "../pages/CMPage";

export interface CMConfigContextProps {
  mode: "edit" | "view";
  setMode: (mode: "edit" | "view") => void;
  saveChange: (
    configId: string,
    componentId: string,
    props: any,
  ) => Promise<void>;
}

export const CMConfigContext = createContext<CMConfigContextProps | undefined>({
  mode: "view",
  setMode: () => { },
  saveChange: async (
    configId: string,
    componentId: string,
    props: any,
  ) => { },
});

interface CMConfigContextProviderProps {
  mode: "edit" | "view";
  children: React.ReactNode;
}

export const CMConfigContextProvider = (
  props: CMConfigContextProviderProps,
) => {
  const [mode, setMode] = useState<"edit" | "view">(props.mode);
  let nextRouter = null;
  nextRouter = require('next/navigation').useRouter();

  const setModeHandler = useCallback((mode: "edit" | "view") => {
    setMode(mode);
  }, [setMode]);

  const saveChange = useCallback(async (configId: string, componentId: string, props: any) => {
    const persister = getPersister();
    await persister(configId, componentId, props);
    if (nextRouter) {
      nextRouter.refresh();
    }
  }, [nextRouter]);

  const contextValue: CMConfigContextProps = {
    mode: mode,
    setMode: setModeHandler,
    saveChange: saveChange,
  };

  return (
    <CMConfigContext.Provider value={contextValue}>
      {props.children}
    </CMConfigContext.Provider>
  );
};
