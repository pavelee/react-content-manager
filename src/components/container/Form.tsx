"use client";

import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Translator, cmComponentGallery, persistConfigData } from "../../pages/CMPage";
import { Card, Select, Table, Form as AntdForm, Drawer, Radio } from "antd";
import { CMComponentInterface } from "../../services/CmComponentGallery";
import { FiArrowDown, FiArrowUp, FiTrash } from "react-icons/fi";
import { ContainerProps } from "./CMContainer";
import { CMComponentClient } from "../component/CMComponent.client";
import { Button } from "../button/Button";

interface ComponentForm {
  setProps: (props: any) => void;
}

export type ContainerWrapperId = {
  configId: string;
  component: CMComponentInterface;
};

interface ComponentGalleryProps {
  addComponentToContainer: (component: CMComponentInterface) => void;
}

const ComponentGallery = (props: ComponentGalleryProps) => {
  const [componentGalleryOpen, setComponentGalleryOpen] = useState(false);
  const [components, setComponents] = useState(
    cmComponentGallery.getPublicComponents(),
  );
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // generate tags from components as options for select
  useEffect(() => {
    const t: { label: string; value: string }[] = [];
    components.forEach((component) => {
      component.tags.forEach((tag) => {
        // add only if not already in tags
        if (!t.find((t) => t.value === tag)) {
          t.push({
            label: tag,
            value: tag,
          });
        }
      });
    });
    setTags(t);
  }, [components]);

  // reduce components to only those that match selected tags
  useEffect(() => {
    if (selectedTags.length === 0) {
      setComponents(cmComponentGallery.getPublicComponents());
    } else {
      // filter through map of components and return only those that match selected tags
      const filteredComponents =
        cmComponentGallery.getPublicComponents(selectedTags);
      setComponents(filteredComponents);
    }
  }, [selectedTags]);

  const closeComponentGallery = useCallback(() => {
    setComponentGalleryOpen(false);
  }, []);

  return (
    <>
      <Button onClick={() => {
        setComponentGalleryOpen(true);
      }}>
        {Translator.translate("ADD_COMPONENT")}
      </Button>
      <Drawer
        title={Translator.translate("COMPONENT_LIBRARY")}
        open={componentGalleryOpen}
        // onCancel={() => setComponentGalleryOpen(false)}
        onClose={() => {
          closeComponentGallery();
        }}
        width={document.body.clientWidth * 0.5}
        footer={null}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <AntdForm>
            <AntdForm.Item>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder={Translator.translate("SEARCH_BY_TAG")}
                value={selectedTags}
                onChange={(value) => {
                  setSelectedTags(value);
                }}
                // onChange={handleChange}
                options={tags}
              />
            </AntdForm.Item>
          </AntdForm>
          {Array.from(components).map(([key, value]) => {
            return (
              <Card
                title={value.name}
                extra={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      key={"addComponent"}
                      usage="primary"
                      onClick={() => {
                        props.addComponentToContainer(value);
                        closeComponentGallery();
                      }}
                    >
                      {Translator.translate("ADD_COMPONENT")}
                    </Button>
                  </div>
                }
                key={key}
                style={{
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    alignItems: "center",
                  }}
                >
                  <CMComponentClient
                    configId={key}
                    componentId={value.id}
                    mode="view"
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};

export const Form = (props: ContainerProps & ComponentForm) => {
  const [configIds, setConfigIds] = useState<ContainerWrapperId[]>([]);
  const [direction, setDirection] = useState<"row" | "column">(
    props.direction ? props.direction : "column",
  );

  useEffect(() => {
    if (props.configIds) {
      setConfigIds(
        props.configIds.map((configId: ContainerWrapperId) => {
          return {
            configId: configId.configId,
            component: cmComponentGallery.getComponent(configId.component.id),
          };
        }),
      );
    }
  }, [props.configIds]);

  const addComponentToContainer = useCallback(async (component: CMComponentInterface) => {
    const configId = Math.random().toString(36).substring(7);
    const data = {};
    await persistConfigData(configId, component.id, data);
    setConfigIds((prev) => {
      return [
        ...prev,
        {
          configId,
          component,
        },
      ];
    });
  }, [setConfigIds]);

  const addContainer = useCallback(async () => {
    const component = cmComponentGallery.getComponent("container");
    const configId = Math.random().toString(36).substring(7);
    await persistConfigData(configId, component.id, {});
    setConfigIds((prev) => {
      return [
        ...prev,
        {
          configId,
          component: component,
        },
      ];
    });
  }, [setConfigIds]);

  const setComponentProps = useCallback(() => {
    props.setProps({
      configIds: configIds.map((config) => {
        return {
          configId: config.configId,
          component: config.component,
        };
      }),
      direction: direction,
    });
  }, [configIds, direction, props]);

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
              component: id.component,
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
                  <div>{record.component.name}</div>
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
                    <FiArrowUp />
                  </Button>
                  <Button onClick={() => moveComponentDown(record.id)}>
                    <FiArrowDown />
                  </Button>
                  <Button onClick={() => deleteComponent(record.id)}>
                    <FiTrash />
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
        <ComponentGallery addComponentToContainer={addComponentToContainer} />
        <Button onClick={addContainer}>
          {Translator.translate("ADD_CONTAINER")}
        </Button>
      </div>
      <Button
        usage="primary"
        onClick={setComponentProps}
      >
        {Translator.translate("APPLY_CHANGES")}
      </Button>
    </div>
  );
};

export default Form;
