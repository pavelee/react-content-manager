import { CMComponentInterface } from "./CmComponentGallery";

export class ComponentService {
  public static async isComponentVisible(
    component: CMComponentInterface,
  ): Promise<boolean> {
    const config = component.config;
    if (config) {
      const c = await (await config()).default();
      if (c.active === false) {
        return false;
      }
    }
    return true;
  }
}
