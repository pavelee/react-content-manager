export type language = "en" | "pl";

import { tranlations as en } from "./translations/en";
import { tranlations as pl } from "./translations/pl";

export class Translator {
  static instance: Translator;
  private language: language = "en";

  private constructor() {}

  static getInstance(): Translator {
    if (!Translator.instance) {
      Translator.instance = new Translator();
    }
    return Translator.instance;
  }

  public setLanguage(language: language): Translator {
    Translator.getInstance().language = language;
    return this;
  }

  public getLanguage(): language {
    return Translator.getInstance().language;
  }

  public translate(key: string): string {
    const instance = Translator.getInstance();
    switch (instance.language) {
      case "en":
        if (!en[key])
          throw new Error(`Translation for key: ${key} not found in en`);
        return en[key];
      case "pl":
        if (!pl[key])
          throw new Error(`Translation for key: ${key} not found in pl`);
        return pl[key];
      default:
        throw new Error(`Language: ${instance.language} not supported`);
    }
  }
}
