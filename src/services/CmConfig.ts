import { CmComponentGallery } from "./CmComponentGallery";
import { Translator, language } from "./translator/translator";

export interface CMComponentData {
  componentId: string;
  data: {
    [key: string]: any;
  };
}

export class CmConfig {
  private cg: CmComponentGallery;

  public constructor(
    private fetcher: (componentId: string) => Promise<CMComponentData>,
    private persister: (
      configId: string,
      componentId: string,
      data: any,
    ) => Promise<void>,
    private language?: language,
    private previewOnInit?: boolean,
  ) {
    this.cg = CmComponentGallery.getInstance();
    this.previewOnInit = previewOnInit || true;
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
    data: any,
  ) => Promise<void> {
    return this.persister;
  }

  public getTranslator(): Translator {
    let language: language = "en";
    if (this.language) {
      language = this.language;
    }
    return Translator.getInstance().setLanguage(language);
  }

  public getPreviewOnInit(): boolean {
    if (this.previewOnInit === undefined) {
      return true;
    }
    return this.previewOnInit;
  }
}
