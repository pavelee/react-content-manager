"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useConfig } from "../../hooks/useConfig";
import { Drawer, Tag } from "antd";
import { EditIcon } from "../icons/EditIcon";
import { OptionsWrapper } from "../OptionsWrapper";
import { DynamicComponent } from "../DynamicComponent";
import { useCMConfig } from "../../context/CMConfigContext";
import { CMComponentProps } from "./CMComponent";

type props = {
  children?: React.ReactNode;
} & CMComponentProps;

export const CMComponentClient = (props: props) => {
  const { children } = props;
  const { mode } = useCMConfig();
  const [visibleForm, setVisibleForm] = useState(false);
  const { setProps, componentProps, component } = useConfig(
    props.configId,
    props.componentId,
    props.initProps,
  );

  const dynamicFormProps = useMemo(() => {
    if (component && component.formPath) {
      return {
        componentPath: component.formPath,
        props: {
          ...componentProps,
          setProps: setProps,
        },
      };
    }
    return undefined;
  }, [setProps, component, componentProps]);

  const hideForm = useCallback(() => {
    setVisibleForm(false);
  }, []);

  return (
    <>
      {mode === "edit" && dynamicFormProps && (
        <Drawer
          open={visibleForm}
          width={document.body.clientWidth * 0.5}
          onClose={hideForm}
          footer={null}
        >
          {dynamicFormProps && <DynamicComponent {...dynamicFormProps} />}
        </Drawer>
      )}
      <div>
        <div
          style={{
            padding: "0.25rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          {mode === "edit" && (
            <>
              <OptionsWrapper
                options={[
                  {
                    icon: <EditIcon />,
                    callback: () => {
                      setVisibleForm(true);
                    },
                  },
                ]}
              />
              <div>
                <Tag>{props.configId}</Tag>
                <Tag>{component?.id}</Tag>
              </div>
            </>
          )}
        </div>
        {children}
      </div>
    </>
  );
};
