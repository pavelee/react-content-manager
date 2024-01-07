export interface StoreInterface {
  getFromStore(configId: string): Promise<any>;
  putInStore(configId: string, componentId: string, data: any): Promise<void>;
}
