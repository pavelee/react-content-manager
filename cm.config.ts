import { CmConfig } from "./src1/services/CmConfig";

const fetcher = async (configId: string): Promise<any> => {};

const persister = async (
  configId: string,
  componentId: string,
  data: any,
) => {};

const cmConfig = new CmConfig(fetcher, persister);

export default cmConfig;
