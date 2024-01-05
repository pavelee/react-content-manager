import { Translator } from "./translator";

describe("Translator", () => {
  beforeEach(() => {
    Translator.getInstance().setLanguage("en");
  });

  it("should set and get the language", () => {
    Translator.getInstance().setLanguage("en");
    expect(Translator.getInstance().getLanguage()).toBe("en");

    Translator.getInstance().setLanguage("pl");
    expect(Translator.getInstance().getLanguage()).toBe("pl");
  });

  it("should translate keys for supported languages", () => {
    Translator.getInstance().setLanguage("en");
    expect(Translator.getInstance().translate("SAVE")).toBe("Save");

    Translator.getInstance().setLanguage("pl");
    expect(Translator.getInstance().translate("SAVE")).toBe("Zapisz");
  });

  it("should throw an error for missing translations", () => {
    Translator.getInstance().setLanguage("en");
    expect(() => Translator.getInstance().translate("missingKey")).toThrow(
      "Translation for key: missingKey not found in en",
    );

    Translator.getInstance().setLanguage("pl");
    expect(() => Translator.getInstance().translate("missingKey")).toThrow(
      "Translation for key: missingKey not found in pl",
    );
  });
});
