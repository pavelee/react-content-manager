import { StoreInterface } from "../StoreInterface";
import fs from "fs";

export class LocalFileStore implements StoreInterface {
  public constructor(public storeFilePath: string) {}

  createFileInStore = () => {
    fs.writeFileSync(this.storeFilePath, JSON.stringify({}));
  };

  checkIfStoreFileExists = () => {
    return fs.existsSync(this.storeFilePath);
  };

  putInStore = async (configId: string, componentId: string, value: any) => {
    if (!this.checkIfStoreFileExists()) {
      this.createFileInStore();
    }

    const store = JSON.parse(fs.readFileSync(this.storeFilePath, "utf-8"));

    store[configId] = {
      componentId,
      data: value,
    };

    fs.writeFileSync(this.storeFilePath, JSON.stringify(store));
  };

  getFromStore = async (key: string): Promise<any> => {
    if (!this.checkIfStoreFileExists()) {
      this.createFileInStore();
    }

    const store = JSON.parse(fs.readFileSync(this.storeFilePath, "utf-8"));

    if (!store[key]) {
      return {};
    }

    return store[key];
  };
}
