import { CmConfig } from "react-content-manager";

// optionally last parameter is language, default is 'en', we support 'pl' as well
const cmConfig = new CmConfig("en");

// register your components
cmConfig.getComponentGallery().registerComponent({
  id: "vite", // unique id of component, you will use it in your code
  name: "Text Block", // name of component, it will be visible in component gallery
  desc: "optionally you can add description for the user", // description of component, it will be visible in component gallery
  public: true, // should be visible in component gallery for users
  componentPath: () => import("./src/components/vite/Vite"), // path to component that will be rendered
  formPath: () => import("./src/components/vite/Form"), // path to component with form that will be use to edit component props
  readProps: () => import("./src/components/vite/ReadProps"), // path to function that will deserialize component props from your persistance layer
  writeProps: () => import("./src/components/vite/WriteProps"), // path to function that will serialize component props to your persistance layer
  tags: ["content", "alert"], // tags that will be used to filter components in component gallery
});

export default cmConfig;
