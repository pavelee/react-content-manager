"use client";

import React, { useEffect } from "react";
import { Drawer, Switch, notification } from "antd";
import { useState } from "react";
import {
  CMConfigContextProvider,
  useCMConfig,
} from "../context/CMConfigContext";
import { Button } from "../components/button/Button";
import { Translator } from "./CMPage";
import { cmConfig } from "./CMPage";

interface ModeratorBarProps {
  initPreviewMode: boolean;
  toggleEditMode: (toggle: boolean) => void;
}

const ModeratorBar = (props: ModeratorBarProps) => {
  const [api, contextHolder] = notification.useNotification();
  const { saveChanges, mode, setMode } = useCMConfig();
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    setMode(props.initPreviewMode ? "view" : "edit");
  }, [setMode, props.initPreviewMode]);

  const save = async () => {
    // @todo what if save fails?
    await saveChanges();
    api.success({
      message: Translator.translate('CHANGES_SAVED'),
      placement: "top",
    });
  };
  return (
    <>
      {contextHolder}
      <Button
        extraStyle={{
          position: "absolute",
          top: "24px",
          right: "0",
          zIndex: 50,
        }}
        onClick={() => setVisible(true)}
      >
        {Translator.translate('EDIT')}
      </Button>
      <Drawer
        title={Translator.translate('MODERATOR_BAR')}
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
            checkedChildren={Translator.translate('EDIT')}
            unCheckedChildren={Translator.translate('PREVIEW')}
            onChange={(checked) => {
              props.toggleEditMode(checked);
              setMode(checked ? "edit" : "view");
            }}
          />
          <Button onClick={() => save()}>{Translator.translate('SAVE_CHANGES')}</Button>
          {/* <Button onClick={() => revertLastChange()}>Revert last change</Button> */}
        </div>
      </Drawer>
    </>
  );
};

interface EditPageProps {
  mode: "edit" | "view";
  children: React.ReactNode;
}

export const EditPage = (props: EditPageProps) => {
  const { mode } = props;

  const toogleEditMode = (toggle: boolean) => {};

  // context should keep changed components

  return (
    <div>
      <CMConfigContextProvider mode={props.mode}>
        <ModeratorBar
          initPreviewMode={cmConfig.getPreviewOnInit()}
          toggleEditMode={toogleEditMode}
        />
        {props.children}
      </CMConfigContextProvider>
    </div>
  );
};
