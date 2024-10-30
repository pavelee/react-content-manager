"use client";

import React, { useCallback } from "react";
import { createContext, useContext, useState } from "react";
import { getPersister } from "../pages/getPersister";
// import { cmComponentGallery, persistConfigData } from "../pages/CMPage";
// import { cmComponentGallery, persistConfigData } from "../pages/CMPage";

interface CMConfigContextProps {
  mode: "edit" | "view";
  setMode: (mode: "edit" | "view") => void;
  saveChanges: () => void;
  saveChange: (
    configId: string,
    componentId: string,
    props: any,
  ) => Promise<void>;
}

export const CMConfigContext = createContext<CMConfigContextProps | undefined>({
  mode: "view",
  setMode: () => { },
  saveChanges: () => { },
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

  const saveChanges = useCallback(async () => {
  }, []);

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
    saveChanges: saveChanges,
    saveChange: saveChange,
  };

  return (
    <CMConfigContext.Provider value={contextValue}>
      {props.children}
    </CMConfigContext.Provider>
  );
};

export const useCMConfig = () => {
  const context = useContext(CMConfigContext);

  if (context === undefined) {
    throw new Error(
      "useCMConfig must be used within a CMConfigContextProvider",
    );
  }

  return context;
};
