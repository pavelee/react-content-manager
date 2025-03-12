export type ConfigReturnType = {
  active?: boolean;
};

export interface CMComponentInterface {
  id: string;
  name: string;
  desc?: string;
  public: boolean;
  componentPath: () => any;
  formPath?: () => any;
  readProps: () => Promise<{
    default: (serailizedProps?: any) => Promise<{ [key: string]: any }>;
  }>;
  writeProps: () => Promise<{
    default: (props: any) => Promise<{ [key: string]: any }>;
  }>;
  config?: () => Promise<{
    default: () => Promise<{
      active?: boolean;
    }>;
  }>;
  tags: string[]; // should be used for search
}

export interface CMComponentGalleryInterface {
  [key: string]: CMComponentInterface;
}

export class CmComponentGallery {
  private static instance: CmComponentGallery;

  private components: Map<string, CMComponentInterface> = new Map();

  private constructor() {}

  public static getInstance(): CmComponentGallery {
    if (!CmComponentGallery.instance) {
      CmComponentGallery.instance = new CmComponentGallery();
    }
    return CmComponentGallery.instance;
  }

  public registerComponent(component: CMComponentInterface): void {
    this.components.set(component.id, component);
  }

  public deleteComponent(componentId: string): void {
    if (!this.components.has(componentId)) {
      throw new Error(`Component ${componentId} is not registered`);
    }
    this.components.delete(componentId);
  }

  public getComponent(componentId: string): CMComponentInterface {
    if (!this.components.has(componentId)) {
      throw new Error(`Component ${componentId} is not registered`);
    }
    return this.components.get(componentId)!;
  }

  public getComponents(): Map<string, CMComponentInterface> {
    return this.components;
  }

  public getPublicComponents(
    tags?: string[],
  ): Map<string, CMComponentInterface> {
    const publicComponents = new Map<string, CMComponentInterface>();
    this.components.forEach((component) => {
      let tagPass = true;
      if (tags) {
        // only if contains all tags
        tagPass = tags.every((tag) => component.tags.includes(tag));
      }
      if (component.public && tagPass) {
        publicComponents.set(component.id, component);
      }
    });
    return publicComponents;
  }
}

export const cmComponentGallery = CmComponentGallery.getInstance();
