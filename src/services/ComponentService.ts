import { ConfigReturnType } from "../types";
import { CMComponentInterface } from "./CmComponentGallery";

export class CS {
  private static instance: CS | null = null;
  private static configCache: Map<string, ConfigReturnType> = new Map();

  private constructor() {}

  public static create(): CS {
    if (!this.instance) {
      this.instance = new CS();
    }
    return this.instance;
  }

  public async getConfig(
    component: CMComponentInterface,
  ): Promise<ConfigReturnType | undefined> {
    if (CS.configCache.has(component.id)) {
      return CS.configCache.get(component.id)!;
    }
    const config = component.config;
    if (config) {
      const c = await (await config()).default();
      CS.configCache.set(component.id, c);
      return c;
    }
    return undefined;
  }

  public async isComponentVisible(
    component: CMComponentInterface,
  ): Promise<boolean> {
    const config = await this.getConfig(component);
    if (config && config.active === false) {
      return false;
    }
    return true;
  }

  public async getComponentCustomStatus(
    component: CMComponentInterface,
  ): Promise<string | undefined> {
    const config = await this.getConfig(component);
    if (config && config.statusComment) {
      return config.statusComment;
    }
    return undefined;
  }
}

export const ComponentService = CS.create();
