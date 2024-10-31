"use client";

import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { EditIcon } from "../icons/EditIcon";
import { useCMConfig } from "../../context/CMConfigContext";
import { Translator } from "../../pages/Translator";

type props = {
  children?: React.ReactNode;
}

export const CMComponentFormWrapper = (props: props) => {
  const { children } = props;
  const { mode } = useCMConfig();
  const [visibleForm, setVisibleForm] = useState(false);

  if (mode === "edit") {
    return (
      <div style={{
        marginTop: "1rem",
        marginBottom: "1rem",
      }}>
        <Button
          icon={<EditIcon />}
          onClick={() => {
            setVisibleForm(true);
          }}
        >
          {Translator.translate("EDIT")}
        </Button>
        <Drawer
          open={visibleForm}
          width={document.body.clientWidth * 0.5}
          onClose={() => setVisibleForm(false)}
          footer={null}
        >
          {children}
        </Drawer>
      </div>
    )
  }

  return null;
};
