"use client";

import React, { useCallback } from "react";
import { Drawer, Switch } from "antd";
import { useState } from "react";
import { CMConfigContextProvider } from "../context/CMConfigContext";
import { EditIcon } from "../components/icons/EditIcon";
import { Translator } from "./Translator";
import { FloatButton } from "../components/float-button/FloatButton";
import { useCMConfig } from "../client/useCMConfig";

const ModeratorBar = () => {
  const { mode, setMode } = useCMConfig();
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <FloatButton
        onClick={() => {
          setVisible(true);
        }}
      >
        <EditIcon />
      </FloatButton>
      <Drawer
        title={Translator.translate("MODERATOR_BAR")}
        placement="right"
        onClose={onClose}
        open={visible}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Switch
            checked={mode === "edit"}
            checkedChildren={Translator.translate("PREVIEW")}
            unCheckedChildren={Translator.translate("EDIT")}
            onChange={(checked) => {
              setMode(checked ? "edit" : "view");
            }}
          />
        </div>
      </Drawer>
    </>
  );
};

interface EditPageProps {
  mode: "edit" | "view";
  children: React.ReactNode;
  isPreviewOnInit: boolean;
}

export const EditPage = (props: EditPageProps) => {
  const { mode } = props;

  // context should keep changed components
  const getInitialMode = useCallback(
    (isPreviewOnInit: boolean) => {
      if (mode === "edit") {
        if (isPreviewOnInit) {
          return "view";
        }
        return mode;
      }
      return mode;
    },
    [mode],
  );

  return (
    <div>
      <CMConfigContextProvider mode={getInitialMode(props.isPreviewOnInit)}>
        <ModeratorBar />
        {props.children}
      </CMConfigContextProvider>
    </div>
  );
};
