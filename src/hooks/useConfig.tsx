import { useEffect, useState } from "react";
import { cmComponentGallery, fetchConfigData } from "../pages/CMPage";
import { CMComponentInterface } from "../services/CmComponentGallery";
import { useCMConfig } from "../context/CMConfigContext";

export const useConfig = (
  configId: string,
  componentId?: string,
  initProps?: object,
) => {
  const { addChange } = useCMConfig();
  const [componentProps, setComponentProps] = useState<
    { [key: string]: any } | undefined
  >(undefined);
  const [component, setComponent] = useState<CMComponentInterface | undefined>(
    undefined,
  );

  useEffect(() => {
    const fd = async () => {
      const config = await fetchConfigData(configId);
      const component = cmComponentGallery.getComponent(
        componentId ? componentId : config.componentId,
      );
      const props = await (await component.readProps()).default(config.data);
      if (initProps) {
        setComponentProps({
          ...initProps,
          ...props,
        });
      } else {
        setComponentProps(props);
      }
      setComponent(component);
    };
    fd();
  }, [configId, componentId, initProps]);

  const reloadProps = async (data: any) => {
    if (component) {
      const props = await (await component.readProps()).default(data);
      setComponentProps(props);
    }
  };

  const setProps = (props: any) => {
    if (componentId) {
      // @todo we should save previous props and compare them to the new ones
      addChange(configId, componentId, props);
    }
    setComponentProps((prev) => {
      if (prev) {
        return {
          ...prev,
          ...props,
        };
      }
      return prev;
    });
    reloadProps(props);
  };

  return {
    component,
    componentProps,
    setProps,
  };
};
