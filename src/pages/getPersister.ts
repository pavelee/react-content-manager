// @ts-expect-error - no types for cmConfig
import persister from "/cm.persister.ts";

export const getPersister = (): ((
  configId: string,
  componentId: string,
  data: any,
) => void) => {
  return persister;
};
