"use client";

import React, { useCallback, useEffect } from "react";
import { Drawer, Switch, notification } from "antd";
import { useState } from "react";
import {
  CMConfigContextProvider,
  useCMConfig,
} from "../context/CMConfigContext";
import { Button } from "../components/button/Button";
import { EditIcon } from "../components/icons/EditIcon";
import { Translator } from "./Translator";
import { FloatButton } from "../components/float-button/FloatButton";

const ModeratorBar = () => {
  const [api, contextHolder] = notification.useNotification();
  const { saveChanges, mode, setMode } = useCMConfig();
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };

  const save = async () => {
    // @todo what if save fails?
    await saveChanges();
    api.success({
      message: Translator.translate("CHANGES_SAVED"),
      placement: "top",
    });
  };
  return (
    <>
      {contextHolder}
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
            checkedChildren={Translator.translate("EDIT")}
            unCheckedChildren={Translator.translate("PREVIEW")}
            onChange={(checked) => {
              setMode(checked ? "edit" : "view");
            }}
          />
          <Button onClick={() => save()}>
            {Translator.translate("SAVE_CHANGES")}
          </Button>
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
      <CMConfigContextProvider
        mode={getInitialMode(props.isPreviewOnInit)}
      >
        <ModeratorBar />
        {props.children}
      </CMConfigContextProvider>
    </div>
  );
};
