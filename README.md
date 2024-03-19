# react-content-manager

## Important!

**Package is now compatibile with Next.js framework and React Server Components**. Still working on integration with other frameworks.

It is still in development process, so it is not recommended to use it in production yet. If you want to test it, you can do it by cloning this repository and running `npm run dev` or `yarn dev` in `example` directory.

## What is it?

React Content Manager is a package that allows you to manage content of your website in a very easy way. It is based on React and Next.js. It is a perfect solution for people who need CMS feature using react stack.

## How to use it?

1. Install package using npm or yarn

```
npm install react-content-manager
```

or

```
yarn add react-content-manager
```

2. Create cm.config.js file in your project root directory and export your configuration. Example configuration:

```javascript
import { CmConfig } from "react-content-manager";

// define function that will fetch data from your persistance layer, eg. database
const fetcher = async (configId: string): Promise<any> => {
  return {};
};

// define function that will save data to your persistance layer, eg. database
const persister = async (
  configId: string,
  componentId: string,
  data: any
) => {};

// optionally last parameter is language, default is 'en', we support 'pl' as well
const cmConfig = new CmConfig(fetcher, persister, 'en');

// register your components
cmConfig.getComponentGallery().registerComponent({
  id: "text-block", // unique id of component, you will use it in your code
  name: "Text Block", // name of component, it will be visible in component gallery
  public: true, // should be visible in component gallery for users
  componentPath: () => import("@/app/components/TextBlock"), // path to component that will be rendered
  formPath: () => import("@/app/components/Form"), // path to component with form that will be use to edit component props
  readProps: () => import("@/app/components/ReadProps"), // path to function that will deserialize component props from your persistance layer
  writeProps: () => import("@/app/components/WriteProps"), // path to function that will serialize component props to your persistance layer
  tags: ["content", "alert"], // tags that will be used to filter components in component gallery
});

export default cmConfig;
```

3. Edit your page.tsx and wrap your page with CmProvider. Example:

```javascript
import { CMComponent, CMProvider } from "react-content-manager";

export default function Home() {
  return (
    <CMProvider mode={"edit"}>
      <CMComponent
        configId="main_top"
        componentId={"text-block"}
        mode={"edit"}
      />
    </CMProvider>
  );
}
```

4. Run your project and go to http://localhost:3000/your-page-route to see component gallery and edit mode.

## Support for container query in tailwindcss

Library supports container query in tailwindcss. You can use it in your components.

You need plugin to enable it -> https://tailwindcss.com/docs/plugins#container-queries

With tailwindcss v4 container query will be included inside framework! 🥳

## Run demo locally

It's very easy to run demo locally.

```
cd demo-next
npm install
npm run dev
```

The demo is using local file to persist data. It's only for demo purposes. In real project you should use your own persistance layer.

## How to develop package locally?

Project is using relative deps package to develop package locally.

1. Clone this repository
2. Run `npm install` in root directory
3. Run `npm install` in `demo-next` directory
4. run `npx relative-deps watch` in `demo-next` directory
5. run `npm run dev` in `demo-next` directory

Project should be rebuild after every change in root directory. (package source code)

After change you have to run `npm run dev` again in `demo-next` directory to see changes. We have to clean next.js cache to see changes.
