"use client";

import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Table, Form as AntdForm, Radio, Drawer } from "antd";
// import { CMComponentInterface } from "../../services/CmComponentGallery";
import { ContainerProps } from "./CMContainer";
import { Button } from "../button/Button";
import { TrashIcon } from "../icons/TrashIcon";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { Translator } from "../../pages/Translator";
import { getPersister } from "../../pages/getPersister";
// import { cmComponentGallery } from "../../pages/CMPage";

interface ComponentForm {
  setProps: (props: any) => void;
  configId: string;
  componentId: string;
  components: string[]
}

export type ContainerWrapperId = {
  configId: string;
  // component: CMComponentInterface;
};

interface ComponentGalleryProps {
  addComponentToContainer: (componentId: string) => void;
  components: string[];
}

const ComponentGallery = (props: ComponentGalleryProps) => {
  const { addComponentToContainer, components } = props;
  const [showGallery, setShowGallery] = useState(false);

  return (<>
    <Button onClick={() => setShowGallery(true)}>
      {Translator.translate("ADD_COMPONENT")}
    </Button>
    <Drawer
      title={Translator.translate("COMPONENT_LIBRARY")}
      placement="right"
      onClose={() => setShowGallery(false)}
      open={showGallery}
    >
      <div className="p-5 flex flex-col gap-4">
        {components.map((component) => {
          return (
            <Button
              key={component}
              onClick={() => {
                addComponentToContainer(component);
                setShowGallery(false);
              }}
            >
              {component}
            </Button>
          );
        })}
      </div>
    </Drawer>
  </>)
};

export const Form = (props: ContainerProps & ComponentForm) => {
  const [configIds, setConfigIds] = useState<ContainerWrapperId[]>([]);
  const [direction, setDirection] = useState<"row" | "column">(
    props.direction ? props.direction : "column",
  );
  let nextRouter = null;
  nextRouter = require('next/navigation').useRouter();

  useEffect(() => {
    if (props.configIds) {
      setConfigIds(
        props.configIds.map((configId: ContainerWrapperId) => {
          return {
            configId: configId.configId,
            // component: cmComponentGallery.getComponent(configId.component.id),
          };
        }),
      );
    }
  }, [props.configIds]);

  const setComponentProps = useCallback(async (
    configId: string,
    componentId: string,
    configIds: ContainerWrapperId[],
    direction?: "row" | "column",
  ) => {
    const persister = getPersister();
    const data: {
      configIds: {
        configId: string;
        // component: CMComponentInterface;
      }[];
      direction?: "row" | "column";
    } = {
      configIds: configIds.map((config) => {
        return {
          configId: config.configId,
          // component: config.component,
        };
      }),
    };
    if (direction) {
      data.direction = direction;
    }
    await persister(
      props.configId,
      props.componentId,
      data
    )
    if (nextRouter) {
      nextRouter.refresh();
    }
    // props.setProps({
    //   configIds: configIds.map((config) => {
    //     return {
    //       configId: config.configId,
    //       component: config.component,
    //     };
    //   }),
    //   direction: direction,
    // });
  }, [props, nextRouter]);

  const addContainer = useCallback(async () => {
    const configId = Math.random().toString(36).substring(7);
    const persister = getPersister();
    await persister(configId, 'container', {});
    const newConfigIds = [
      ...configIds,
      {
        configId,
        // component: cmComponentGallery.getComponent('container'),
      },
    ]
    await setComponentProps(
      props.configId,
      props.componentId,
      newConfigIds,
      direction,
    );
  }, [configIds, direction, props, setComponentProps]);

  const addComponentToContainer = useCallback(async (componentId: string) => {
    const configId = Math.random().toString(36).substring(7);
    const persister = getPersister();
    await persister(configId, componentId, {});
    const newConfigIds = [
      ...configIds,
      {
        configId,
        // component: cmComponentGallery.getComponent('container'),
      },
    ]
    await setComponentProps(
      props.configId,
      props.componentId,
      newConfigIds,
      direction,
    );
  }, [configIds, direction, props, setComponentProps]);

  const deleteComponent = useCallback((componentId: string) => {
    setConfigIds((prev) => {
      return prev.filter((config) => {
        return config.configId !== componentId;
      });
    });
  }, [setConfigIds]);

  const swapComponentPosition = useCallback((
    componentId: string,
    direction: "up" | "down",
  ) => {
    const index = configIds.findIndex((config) => {
      return config.configId === componentId;
    });
    const component = configIds[index];
    if (index === undefined) {
      return;
    }
    if (direction === "up") {
      if (index === 0) {
        return;
      }
      const newComponentIds = [...configIds];
      newComponentIds[index] = configIds[index - 1];
      newComponentIds[index - 1] = component;
      setConfigIds(newComponentIds);
    } else {
      if (index === configIds.length - 1) {
        return;
      }
      const newComponentIds = [...configIds];
      newComponentIds[index] = configIds[index + 1];
      newComponentIds[index + 1] = component;
      setConfigIds(newComponentIds);
    }
  }, [configIds, setConfigIds]);

  const moveComponentUp = useCallback((componentId: string) => {
    swapComponentPosition(componentId, "up");
  }, [swapComponentPosition]);

  const moveComponentDown = useCallback((componentId: string) => {
    swapComponentPosition(componentId, "down");
  }, [swapComponentPosition]);

  return (
    <div
      style={{
        transform: "translateY(1.25rem)",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <AntdForm
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "1.25rem",
        }}
        layout="vertical"
      >
        <AntdForm.Item label={Translator.translate("COMPONENT_DIRECTION")}>
          <Radio.Group size="middle" className="flex" value={direction} onChange={(ev) => setDirection(ev.target.value)}>
            <Radio.Button className="w-full" value="row">{Translator.translate("COMPONENT_DIRECTION_HORIZONTAL")}</Radio.Button>
            <Radio.Button className="w-full" value="column">{Translator.translate("COMPONENT_DIRECTION_VERTICAL")}</Radio.Button>
          </Radio.Group>
        </AntdForm.Item>
        <Table
          pagination={false}
          dataSource={configIds.map((id) => {
            return {
              id: id.configId,
              // component: id.component,
            };
          })}
          rowKey={(record) => record.id}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: Translator.translate("COMPONENT"),
              key: "komponent",
              render: (text, record) => (
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                  }}
                >
                  {/* <div>{record.component.name}</div> */}
                </div>
              ),
            },
            {
              title: Translator.translate("ACTIONS"),
              key: "actions",
              render: (text, record) => (
                <div style={{
                  transform: "translateY(0.5rem)",
                  display: "flex",
                  gap: "0.75rem",
                }}>
                  <Button onClick={() => moveComponentUp(record.id)}>
                    <ArrowUpIcon />
                  </Button>
                  <Button onClick={() => moveComponentDown(record.id)}>
                    <ArrowDownIcon />
                  </Button>
                  <Button onClick={() => deleteComponent(record.id)}>
                    <TrashIcon />
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </AntdForm>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
        }}
      >
        <ComponentGallery
          addComponentToContainer={addComponentToContainer}
          components={props.components}
        />
        <Button onClick={addContainer}>
          {Translator.translate("ADD_CONTAINER")}
        </Button>
      </div>
      <Button
        usage="primary"
        onClick={() => {
          setComponentProps(
            props.configId,
            props.componentId,
            configIds,
            direction,
          );
        }}
      >
        {Translator.translate("APPLY_CHANGES")}
      </Button>
    </div>
  );
};

export default Form;
