"use client";

import React, { useMemo, useState } from "react";
import { Button, Drawer, Tag } from "antd";
import { EditIcon } from "../icons/EditIcon";
import { OptionsWrapper } from "../OptionsWrapper";
import { DynamicComponent } from "../DynamicComponent";
import { useCMConfig } from "../../context/CMConfigContext";

type props = {
  children?: React.ReactNode;
  // componentProps: any;
  // setProps: string;
  // configId?: string;
  // componentId?: string;
  // formPath: string
}

export const CMComponentClient = (props: props) => {
  const { children } = props;
  const { mode } = useCMConfig();
  const [visibleForm, setVisibleForm] = useState(false);
  // const { setProps, component } = useConfig(
  //   props.configId,
  //   props.componentId,
  //   props.initProps,
  // );

  // const dynamicFormProps = useMemo(() => {
  //   if (formPath) {
  //     return {
  //       componentPath: () => import(formPath),
  //       props: {
  //         ...componentProps,
  //         setProps: setProps,
  //       },
  //     };
  //   }
  //   return undefined;
  // }, [setProps, componentProps]);

  return (
    <>
      {mode === "edit" && (
        <>
          <Button
            icon={<EditIcon />}
            onClick={() => {
              setVisibleForm(true);
            }}
          >
            Edytuj
          </Button>
          <Drawer
            open={visibleForm}
            width={document.body.clientWidth * 0.5}
            onClose={() => setVisibleForm(false)}
            footer={null}
          >
            {children}
            {/* {dynamicFormProps && <DynamicComponent {...dynamicFormProps} />} */}
          </Drawer>
        </>
      )}
      {/* <div
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
                <Tag>{props.componentId}</Tag>
              </div>
            </div>
          )}
        </div>
        {children}
      </div> */}
    </>
  );
};
