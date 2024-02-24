"use client";

import React, { useCallback } from "react";
import { createContext, useContext, useState } from "react";
import { CMComponentInterface } from "../services/CmComponentGallery";
import { cmComponentGallery, persistConfigData } from "../pages/CMPage";

interface CMConfigContextProps {
  mode: "edit" | "view";
  setMode: (mode: "edit" | "view") => void;
  changes: { [configId: string]: { [componentId: string]: any } };
  addChange: (configId: string, componentId: string, props: any) => void;
  revertLastChange: () => void;
  saveChanges: () => void;
}

export const CMConfigContext = createContext<CMConfigContextProps | undefined>({
  mode: "view",
  setMode: () => { },
  changes: {},
  addChange: () => { },
  revertLastChange: () => { },
  saveChanges: () => { },
});

interface CMConfigContextProviderProps {
  mode: "edit" | "view";
  children: React.ReactNode;
}

export const CMConfigContextProvider = (
  props: CMConfigContextProviderProps,
) => {
  const [mode, setMode] = useState<"edit" | "view">(props.mode);
  const [changes, setChanges] = useState<{
    [configId: string]: { [componentId: string]: any };
  }>({});

  const setModeHandler = useCallback((mode: "edit" | "view") => {
    setMode(mode);
  }, [setMode]);

  const saveComponent = async (
    configId: string,
    component: CMComponentInterface,
    props: any,
  ) => {
    if (component && component.formPath) {
      const data = await (await component.writeProps()).default(props);
      await persistConfigData(configId, component.id, data);
    }
  };

  const saveChanges = useCallback(async () => {
    const configIds = Object.keys(changes);
    for (let i = 0; i < configIds.length; i++) {
      const configId = configIds[i];
      const componentIds = Object.keys(changes[configId]);
      for (let j = 0; j < componentIds.length; j++) {
        const componentId = componentIds[j];
        const component = cmComponentGallery.getComponent(componentId);
        await saveComponent(
          configId,
          component,
          changes[configId][componentId],
        );
      }
    }
    setChanges({});
  }, [setChanges, changes]);

  const contextValue: CMConfigContextProps = {
    mode: mode,
    setMode: setModeHandler,
    changes: changes,
    addChange: (configId: string, componentId: string, props: any) => {
      const newChanges = { ...changes };
      if (!newChanges[configId]) {
        newChanges[configId] = {};
      }
      newChanges[configId][componentId] = props;
      setChanges(newChanges);
    },
    revertLastChange: () => {
      // @TODO
    },
    saveChanges: saveChanges,
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
