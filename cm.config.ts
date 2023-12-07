import { CmConfig } from "./src/services/CmConfig";

const fetcher = async (configId: string): Promise<any> => {};

const persister = async (
  configId: string,
  componentId: string,
  data: any,
) => {};

const cmConfig = new CmConfig(fetcher, persister);

export default cmConfig;
