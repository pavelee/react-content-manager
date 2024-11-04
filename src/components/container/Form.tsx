"use client";

import React, { useCallback } from "react";
import { useState } from "react";
import { Table, Form as AntdForm, Radio, Drawer } from "antd";
import { ContainerProps } from "./CMContainer";
import { Button } from "../button/Button";
import { TrashIcon } from "../icons/TrashIcon";
import { ArrowDownIcon } from "../icons/ArrowDownIcon";
import { ArrowUpIcon } from "../icons/ArrowUpIcon";
import { Translator } from "../../pages/Translator";
import { ComponentDetails, ComponentDetailsList } from "../../types";
import Card from "../card/Card";
import { useCMConfig } from "../../client/useCMConfig";
import { generateConfigId } from "../../services/generateConfigId";

interface ComponentForm {
  setProps: (props: any) => void;
  configId: string;
  componentId: string;
  components: ComponentDetailsList
}

export type ContainerWrapperId = {
  configId: string;
  componentId: string;
};

type SelectedComponent = ComponentDetails & { configId: string }
type selectedComponentList = SelectedComponent[];

interface ComponentGalleryProps {
  addComponentToContainer: (componentId: string) => void;
  components: ComponentDetailsList;
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
            <Card
              key={component.id}
              title={component.name}
              description={component.desc}
              actions={[
                <Button
                  key="add"
                  onClick={() => {
                    addComponentToContainer(component.id);
                    setShowGallery(false);
                  }}
                >
                  {Translator.translate("ADD_COMPONENT")}
                </Button>
              ]}
            />
          )
        })}
      </div>
    </Drawer>
  </>)
};

export const Form = (props: ContainerProps & ComponentForm) => {
  const { components } = props;
  const { saveChange, isSaving } = useCMConfig();
  const [configIds, setConfigIds] = useState<ContainerWrapperId[]>(props.configIds && props.configIds?.length > 0 ?
    props.configIds.map((configId: ContainerWrapperId) => {
      return {
        configId: configId.configId,
        componentId: configId.componentId,
      };
    })
    : []
  );
  const [direction, setDirection] = useState<"row" | "column">(
    props.direction ? props.direction : "column",
  );

  const getComponentListForSelectedIds = useCallback(() => {
    const c: selectedComponentList = [];
    configIds.forEach((config) => {
      if (config.componentId === "container") {
        c.push({
          id: config.configId,
          name: "Container",
          configId: config.configId,
        });
      }
      const filtered = components.filter((component) => {
        return component.id === config.componentId;
      });
      if (filtered.length > 0) {
        c.push({
          ...filtered[0],
          configId: config.configId,
        });
      }
    });
    return c;
  }, [components, configIds]);

  const saveComponentProps = useCallback(async (
    configId: string,
    componentId: string,
    configIds: ContainerWrapperId[],
    direction?: "row" | "column",
  ) => {
    const data: {
      configIds: {
        configId: string;
        componentId: string;
      }[];
      direction?: "row" | "column";
    } = {
      configIds: configIds.map((config) => {
        return {
          configId: config.configId,
          componentId: config.componentId,
        };
      }),
    };
    if (direction) {
      data.direction = direction;
    }
    await saveChange(
      configId,
      componentId,
      data
    )
  }, [props, saveChange]);

  const addContainer = useCallback(async () => {
    const configId = generateConfigId();
    const componentId = "container";
    await saveChange(configId, componentId, {});
    const newConfigIds = [
      ...configIds,
      {
        configId,
        componentId: componentId,
      },
    ];
    setConfigIds(newConfigIds);
  }, [configIds, direction, props, saveComponentProps, saveChange]);

  const addComponentToContainer = useCallback(async (componentId: string) => {
    const configId = generateConfigId();
    await saveChange(configId, componentId, {});
    const newConfigIds = [
      ...configIds,
      {
        configId,
        componentId: componentId,
      },
    ];
    setConfigIds(newConfigIds);
  }, [configIds, direction, props, saveComponentProps, saveChange]);

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
          dataSource={getComponentListForSelectedIds()}
          rowKey={(record) => record.configId}
          columns={[
            {
              title: "ID",
              key: "id",
              render: (record: SelectedComponent) => (
                <div>{record.configId}</div>
              ),
            },
            {
              title: Translator.translate("COMPONENT"),
              key: "komponent",
              render: (record: SelectedComponent) => (
                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                  }}
                >
                  <div>{record.name}</div>
                </div>
              ),
            },
            {
              title: Translator.translate("ACTIONS"),
              key: "actions",
              render: (record: SelectedComponent) => (
                <div style={{
                  transform: "translateY(0.5rem)",
                  display: "flex",
                  gap: "0.75rem",
                }}>
                  <Button onClick={() => moveComponentUp(record.configId)}>
                    <ArrowUpIcon />
                  </Button>
                  <Button onClick={() => moveComponentDown(record.configId)}>
                    <ArrowDownIcon />
                  </Button>
                  <Button onClick={() => deleteComponent(record.configId)}>
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
          components={components}
        />
        <Button onClick={addContainer}>
          {Translator.translate("ADD_CONTAINER")}
        </Button>
      </div>
      <Button
        usage="primary"
        onClick={() => {
          saveComponentProps(
            props.configId,
            props.componentId,
            configIds,
            direction,
          );
        }}
      >
        {Translator.translate("SAVE_CHANGES")}
      </Button>
    </div>
  );
};

export default Form;
