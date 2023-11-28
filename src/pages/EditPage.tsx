"use client";

import React from "react";
import { Button, Drawer, Switch, notification } from "antd";
import { useState } from "react";
import {
  CMConfigContextProvider,
  useCMConfig,
} from "../context/CMConfigContext";

interface ModeratorBarProps {
  isEditMode: boolean;
  toggleEditMode: (toggle: boolean) => void;
}

const ModeratorBar = (props: ModeratorBarProps) => {
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
      message: "Changes saved",
      placement: "top",
    });
  };
  return (
    <>
      {contextHolder}
      <Button
        style={{
          position: "absolute",
          top: "24px",
          right: "0",
          zIndex: 50,
        }}
        onClick={() => setVisible(true)}
      >
        Edit
      </Button>
      <Drawer
        title="Moderator bar"
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
            checkedChildren="edit"
            unCheckedChildren="preview"
            onChange={(checked) => {
              props.toggleEditMode(checked);
              setMode(checked ? "edit" : "view");
            }}
          />
          <Button onClick={() => save()}>Save changes</Button>
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

  const toogleEditMode = (toggle: boolean) => {
    // @todo
    console.log(toggle);
  };

  // context should keep changed components

  return (
    <div>
      <CMConfigContextProvider mode={props.mode}>
        <ModeratorBar
          isEditMode={mode === "edit"}
          toggleEditMode={toogleEditMode}
        />
        {props.children}
      </CMConfigContextProvider>
    </div>
  );
};
