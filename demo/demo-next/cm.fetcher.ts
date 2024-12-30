import { CmHostHandler } from "react-content-manager";

const fetcher = async (componentId: string): Promise<any> => {
  let host = CmHostHandler.getHost();
  const data = await fetch(`${host}/api/store?configId=${componentId}`, {
    cache: "no-cache",
  });
  const json = await data.json();
  return json;
};

export default fetcher;
