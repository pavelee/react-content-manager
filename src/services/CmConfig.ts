import { CMComponentData } from "../hooks/data";
import { CmComponentGallery } from "./CmComponentGallery";

export class CmConfig {
  private cg: CmComponentGallery;

  public constructor(
    private fetcher: (componentId: string) => Promise<CMComponentData>,
    private persister: (
      configId: string,
      componentId: string,
      data: any
    ) => Promise<void>
  ) {
    this.cg = CmComponentGallery.getInstance();
  }

  public getComponentGallery(): CmComponentGallery {
    return this.cg;
  }

  public getFetcher(): (componentId: string) => Promise<CMComponentData> {
    return this.fetcher;
  }

  public getPersister(): (
    configId: string,
    componentId: string,
    data: any
  ) => Promise<void> {
    return this.persister;
  }
}
