// @ts-expect-error - no types for cmConfig
import fetcher from "/cm.fetcher.ts";

export const getFetcher = (): ((configId: string) => Promise<any>) => {
  return fetcher;
};
