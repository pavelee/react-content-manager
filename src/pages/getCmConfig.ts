import { CmConfig } from "../services/CmConfig";

export const getCmConfig = (): CmConfig => {
  return require("../../../demo-next/cm.config.ts").default;
};