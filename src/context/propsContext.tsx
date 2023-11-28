import React, { createContext, useContext, useState } from "react";

interface PageGeneratorProp {
  componentPath: string;
  formPath?: string;
  props: {
    [key: string]: any;
  };
}

interface PageGeneratorContextInterface {
  props: {
    [key: string]: PageGeneratorProp;
  };
  getPageGeneratorProp: (componentId: string) => PageGeneratorProp;
  setPageGeneratorProp: (
    componentId: string,
    propKey: string,
    propValue: any,
  ) => void;
}

export const PageGeneratorContext =
  createContext<PageGeneratorContextInterface>({
    props: {},
    getPageGeneratorProp: () => {
      return {} as PageGeneratorProp;
    },
    setPageGeneratorProp: () => {},
  });

export const PageGeneratorContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [pageGeneratorProps, setPageGeneratorProps] = useState<
    PageGeneratorContextInterface["props"]
  >({
    "123412": {
      componentPath: "news-feed/NewsFeed.tsx",
      formPath: "news-feed/Form.tsx",
      // componentPath: 'NewsFeed',
      props: {
        text: "Hello World",
      },
    },
    "123415": {
      componentPath: "news-feed/NewsFeed.tsx",
      formPath: "news-feed/Form.tsx",
      // componentPath: 'NewsFeed',
      props: {
        text: "Hello World 123",
      },
    },
    "123413": {
      componentPath: "Baner.tsx",
      formPath: "news-feed/Form.tsx",
      props: {
        baner: "https://picsum.photos/200/300",
      },
    },
  });

  const getPageGeneratorProp = (componentId: string): PageGeneratorProp => {
    return pageGeneratorProps[componentId];
  };

  const setPageGeneratorProp = (
    componentId: string,
    propKey: string,
    propValue: any,
  ) => {
    setPageGeneratorProps((prevProps) => {
      return {
        ...prevProps,
        [componentId]: {
          ...prevProps[componentId],
          props: {
            ...prevProps[componentId].props,
            [propKey]: propValue,
          },
        },
      };
    });
  };

  const contextValue: PageGeneratorContextInterface = {
    props: pageGeneratorProps,
    getPageGeneratorProp: getPageGeneratorProp,
    setPageGeneratorProp: setPageGeneratorProp,
  };

  return (
    <PageGeneratorContext.Provider value={contextValue}>
      {props.children}
    </PageGeneratorContext.Provider>
  );
};

export const usePageGeneratorContext = () => useContext(PageGeneratorContext);
