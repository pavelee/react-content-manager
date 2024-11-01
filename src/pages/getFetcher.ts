// @ts-expect-error - no types for cmConfig
import fetcher from "/cm.fetcher.config.ts";

export const getFetcher = (): ((configId: string) => Promise<any>) => {
  return fetcher;
};
