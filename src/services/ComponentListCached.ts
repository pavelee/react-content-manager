import type { ComponentDetailsList } from "../types";
import { cmComponentGallery } from "./CmComponentGallery";
import { ComponentService } from "./ComponentService";

class CLC {
  private static instance: CLC | null = null;
  private static componentListCache: Promise<ComponentDetailsList> | null =
    null;

  private constructor() {}

  public static create(): CLC {
    if (!this.instance) {
      this.instance = new CLC();
    }
    return this.instance;
  }

  public static resetCache(): void {
    CLC.componentListCache = null;
  }

  public getAvailableComponentIdList =
    async (): Promise<ComponentDetailsList> => {
      if (CLC.componentListCache) {
        return CLC.componentListCache;
      }

      CLC.componentListCache = (async () => {
        const c = cmComponentGallery.getPublicComponents();
        const cArray = Array.from(c);
        const componentIdList: ComponentDetailsList = [];
        // list map
        for (let i = 0; i < cArray.length; i++) {
          const component = cArray[i][1];
          if (
            (await ComponentService.isComponentVisible(component)) === false
          ) {
            continue;
          }
          componentIdList.push({
            id: component.id,
            name: component.name,
            desc: component.desc,
            active: true,
          });
        }

        return componentIdList;
      })();

      return CLC.componentListCache;
    };
}

export const ComponentListCached = CLC.create();
