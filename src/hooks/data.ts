export interface CMComponentData {
  componentId: string;
  data: {
    [key: string]: any;
  };
}

const data: { [key: string]: CMComponentData } = {
  "123412": {
    componentId: "news_feed",
    data: {
      text: "Hello World 123",
      page: 1,
    },
  },
  "123415": {
    componentId: "news_feed",
    data: {
      text: "Hello World 123",
      page: 1,
    },
  },
  "123413": {
    componentId: "baner",
    data: {
      baner: "https://picsum.photos/200/300",
      text: "Hello World 123",
    },
  },
};

export const addData = async (
  componentData: CMComponentData,
  configId?: string
) => {
  if (!configId) {
    configId = Math.random().toString(36).substring(7);
  }
  data[configId] = componentData;
  return configId;
};
