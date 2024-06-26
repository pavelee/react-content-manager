"use client";

import React, { useEffect } from "react";
import { Drawer, FloatButton, Switch, notification } from "antd";
import { useState } from "react";
import {
  CMConfigContextProvider,
  useCMConfig,
} from "../context/CMConfigContext";
import { Button } from "../components/button/Button";
import { Translator } from "./CMPage";
import { cmConfig } from "./CMPage";
import { EditIcon } from "../components/icons/EditIcon";

interface ModeratorBarProps {
  initPreviewMode: boolean;
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
      <FloatButton
        onClick={() => setVisible(true)}
        icon={<EditIcon />}
        style={{ top: 100 }}
      >
        {Translator.translate('EDIT')}

      </FloatButton>
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

  // context should keep changed components

  return (
    <div>
      <CMConfigContextProvider mode={mode}>
        <ModeratorBar
          initPreviewMode={cmConfig.getPreviewOnInit()}
        />
        {props.children}
      </CMConfigContextProvider>
    </div>
  );
};
