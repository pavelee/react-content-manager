"use client";

import React, { useMemo, useState } from "react";
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
  console.log('props', props);  
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

  return (
    <>
      {mode === "edit" && dynamicFormProps && (
        <Drawer
          open={visibleForm}
          width={document.body.clientWidth * 0.5}
          onClose={() => setVisibleForm(false)}
          footer={null}
        >
          {dynamicFormProps && <DynamicComponent {...dynamicFormProps} />}
        </Drawer>
      )}
      <div
        style={mode === "edit" ? {
          border: "1px solid lightgray",
          padding: "0.25rem",
          borderRadius: "0.25rem",
        } : {}}
      >
        <div
          style={{
            // padding: "0.25rem",
            // display: "flex",
            // gap: "0.75rem",
            // alignItems: "center",
          }}
        >
          {mode === "edit" && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
              marginBottom: "0.25rem",
            }}>
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
            </div>
          )}
        </div>
        {children}
      </div>
    </>
  );
};
