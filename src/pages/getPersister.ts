// @ts-expect-error - no types for cmConfig
import persister from "/cm.persister.config.ts";

export const getPersister = (): ((
  configId: string,
  componentId: string,
  data: any,
) => void) => {
  return persister;
};
