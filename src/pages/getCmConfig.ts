import { CmConfig } from "../services/CmConfig";
// @ts-expect-error - no types for cmConfig
import cmConfig from "/cm.config.ts";

export const getCmConfig = (): CmConfig => {
  return cmConfig;
};
