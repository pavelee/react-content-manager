import { CmConfig } from "../services/CmConfig";
// @ts-expect-error - no types for cmConfig
import cmConfig from "../../../demo-next/cm.config.ts";

export const getCmConfig = (): CmConfig => {
  return cmConfig;
};

// export const getCmConfig = (): CmConfig => {
//   // console.log(require("../../../demo-next/cm.config.ts"));
//   return require("../../../demo-next/cm.config.ts").default;
// };