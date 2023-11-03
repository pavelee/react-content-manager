'use client'

import { EditableProps } from "../../pages/CMPage";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useConfig } from "../../hooks/useConfig";
import { Drawer, Modal, Spin, Tag } from "antd";
import { OptionsWrapper } from "../OptionsWrapper";
import { FiArrowDown, FiArrowUp, FiSave, FiSettings, FiTrash } from "react-icons/fi";
import { DynamicComponent } from "../DynamicComponent";
import { useCMConfig } from "../../context/CMConfigContext";
import { containerComponentId, persistConfigData } from "../../pages/CMPage";
import { CMComponentProps } from "./CMComponent";
import { Skeleton } from "../Skeleton";

export const CMComponentClient = (props: CMComponentProps) => {
  const { mode } = useCMConfig();
  const [visibleForm, setVisibleForm] = useState(false);
  const { setProps, componentProps, component } = useConfig(props.configId, props.componentId, props.initProps);

  // @todo rething this, it's a bit hacky
  if (componentProps && component) {
    if (component.id === containerComponentId) {
      componentProps.mode = mode;
    }
  }

  const dynamicComponentProps = useMemo(() => {
    if (componentProps && component) {
      return {
        componentPath: component.componentPath,
        props: componentProps,
      };
    }
    return undefined;
  }, [component, componentProps]);

  const dynamicFormProps = useMemo(() => {
    if (component && component.formPath) {
      return {
        componentPath: component.formPath,
        props: {
          ...componentProps,
          setProps: setProps
        }
      };
    }
    return undefined;
  }, [setProps, component, componentProps]);

  const DynamicComponentMemoized = useMemo(() => {
    if (dynamicComponentProps) {
      return <DynamicComponent {...dynamicComponentProps} />;
    }
    return null;
  }, [dynamicComponentProps]);

  if (!component) {
    return <Skeleton />
  }

  return (
    <>
      {
        mode === 'edit' && dynamicFormProps &&
        <Drawer
          open={visibleForm}
          width={document.body.clientWidth * 0.5}
          onClose={() => setVisibleForm(false)}
          footer={null}
        >
          {dynamicFormProps && <DynamicComponent {...dynamicFormProps} />}
        </Drawer>
      }
      <div>
        <div className="p-1 flex gap-3 items-center">
          {mode === 'edit' &&
            <>
              <OptionsWrapper options={[
                {
                  icon: <FiSettings />,
                  callback: () => {
                    setVisibleForm(true);
                  }
                },
              ]} />
              <div>
                <Tag>{props.configId}</Tag>
                <Tag>{component.id}</Tag>
              </div>
            </>}
        </div>
        {DynamicComponentMemoized}
      </div>
    </>
  )
}