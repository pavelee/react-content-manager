# react-content-manager

## Important!

Package is now stable, it could be used on production.

## What is it?

React Content Manager is a package that allows you to build your app from manageable components, that can be edited by users for their needs.

## Roadmap

- Add support to customize UI of the package
- Add support to customize Skeleton
- Drop antd library for smaller size of the package

## How to use it?

### Install package with your choice package manager

```
npm install react-content-manager
```

or

```
yarn add react-content-manager
```

### If you are using React 19

You need to install `@ant-design/v5-patch-for-react-19`, more here: https://ant.design/docs/react/v5-for-19#compatibility-package

```
npm install --save-dev @ant-design/v5-patch-for-react-19
```

### Integrate with your framework/bundler

#### Usage with Next.js

inside your next.config.js add or merge with existing one:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // .. your other options
  webpack: (config) => {
    const path = require("path");
    config.resolve.alias = {
      ...config.resolve.alias,
      "cm.config.ts": path.resolve(__dirname, "cm.config.ts"),
      "cm.fetcher.ts": path.resolve(__dirname, "cm.fetcher.ts"),
      "cm.persister.ts": path.resolve(__dirname, "cm.persister.ts"),
    };
    return config;
  },
};

module.exports = nextConfig;
```

#### Usage with Vite

Inside your vite.config.ts add or merge with existing one:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "cm.config.ts": path.resolve(__dirname, "cm.config.ts"),
      "cm.fetcher.ts": path.resolve(__dirname, "cm.fetcher.ts"),
      "cm.persister.ts": path.resolve(__dirname, "cm.persister.ts"),
    },
  },
});
```

### Add necessary files to your root directory

### Create cm.config.ts

```typescript
import { CmConfig } from "react-content-manager";

// optionally last parameter is language, default is 'en', we support 'pl' as well
const cmConfig = new CmConfig("en");

export default cmConfig;
```

### Create cm.fetcher.ts

```typescript
import { CmHostHandler } from "react-content-manager";

const fetcher = async (componentId: string): Promise<any> => {
  return {};
};

export default fetcher;
```

### Create cm.persister.ts

```typescript
"use client";

import { CmHostHandler } from "react-content-manager";

const persister = async (configId: string, componentId: string, data: any) => {
  return {};
};

export default persister;
```

## Minimal example of usage - TextEdit component

### Working example in code

You can find working example inside demo catalog

- demo-next
  - Demo with latest Next.js framework
- demo-vite
  - Demo with latest Vite

### How to add TextEdit component?

You need 4 files:

- Component.tsx - contains component itself
- Form.tsx - contains form that will be use to configure component by user
- ReadProps.ts - function that will deserialize data from source to component props
- WriteProps.ts - function that will serialize data from component props to source

minimal example for components (live inside demo-next app)

`Component.tsx`

```typescript
export type ComponentProps = {
  text?: string;
};

const Component = (props: ComponentProps) => {
  const { text } = props;

  return (
    <div className="bg-white p-4 rounded-xl">
      <div className="text-black">{text}</div>
    </div>
  );
};

// remember to export default the component!
export default Component;
```

`Form.tsx`

```typescript
"use client";

import { useState } from "react";
import { useCMConfig } from "react-content-manager/dist/esm/client/useCMConfig";
import { ComponentProps } from "./Component";

interface ComponentForm {
  configId: string;
  componentId: string;
}

const Form = (props: ComponentProps & ComponentForm) => {
  /**
   * // If you are using next.js you might want refresh page after saving changes
   * const router = useRouter();
   * // then pass the onSuccess as parameter of saveChange function
   * const OnSuccess = () => {
   *  router.refresh();
   * }
   **/
  const { saveChange, isSaving } = useCMConfig();
  const [limit, setLimit] = useState(props.text);

  return (
    <>
      <form
        className="p-5 flex flex-col gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const text = formData.get("text") as string;
          await saveChange(props.configId, props.componentId, {
            text: text,
          });
        }}
      >
        <div>
          <input
            type="text"
            name="text"
            defaultValue={props.text}
            className="bg-white p-2 rounded-lg border border-gray-300"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
```

`ReadProps.tsx`

```typescript
import { ComponentProps } from "./Component";

const readProps = async (
  serializedProps?: ComponentProps,
): Promise<ComponentProps> => {
  return {
    text: serializedProps?.text ?? "Default text, edit me!",
  };
};

export default readProps;
```

`WriteProps.tsx`

```typescript
import { ComponentProps } from "./Component";

export const writeProps = async (props: ComponentProps) => {
  const data = {
    text: props.text,
  };
  return data;
};

export default writeProps;
```

`cm.config.ts`

```typescript
import { CmConfig } from "react-content-manager";

// optionally last parameter is language, default is 'en', we support 'pl' as well
const cmConfig = new CmConfig("en");

// register your components
cmConfig.getComponentGallery().registerComponent({
  id: "text-block", // unique id of component, you will use it in your code
  name: "Text Block", // name of component, it will be visible in component gallery
  desc: "optionally you can add description for the user", // description of component, it will be visible in component gallery
  public: true, // should be visible in component gallery for users
  componentPath: () => import("@/app/components/text-block/Component"), // path to component that will be rendered
  formPath: () => import("@/app/components/text-block/Form"), // path to component with form that will be use to edit component props
  readProps: () => import("@/app/components/text-block/ReadProps"), // path to function that will deserialize component props from your persistence layer
  writeProps: () => import("@/app/components/text-block/WriteProps"), // path to function that will serialize component props to your persistence layer
  tags: ["content", "alert"], // tags that will be used to filter components in component gallery
});

export default cmConfig;
```

`cm.persister.ts`

`Architecture Note:
We are separating persister from configuration because of nature of React Server Component. We need to asure it will work on client side, because component edition need interactivity`

```javascript
"use client";

import { CmHostHandler } from "react-content-manager";

const persister = async (configId: string, componentId: string, data: any) => {
  const host = CmHostHandler.getHost();
  const response = await fetch(`${host}/api/store`, {
    method: "POST",
    body: JSON.stringify({
      configId: configId,
      componentId: componentId,
      data: data,
    }),
  });
};

export default persister;
```

`cm.fetcher.ts`

`Architecture Note:
If you are using Next.js framework code below will run on the server, otherwise it will run on client side`

```typescript
import { CmHostHandler } from "react-content-manager";

const fetcher = async (componentId: string): Promise<any> => {
  let host = CmHostHandler.getHost();
  const data = await fetch(`${host}/api/store?configId=${componentId}`, {
    cache: "no-cache",
  });
  const json = await data.json();
  return json;
};

export default fetcher;
```

`page.tsx`

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

## Configuration

You can pass configuration by parameter `config` to `CMProvider` component.

options:

- `nextjs`
  - `useRouterRefreshOnSave` -> if true, when you save config, it will refresh RSC components with new state

example of config usage:

```typescript
import { CMComponent, CMProvider } from "react-content-manager";

export default function Home() {
  return (
    <CMProvider mode={"edit"} config={{
      nextjs: {
        useRouterRefreshOnSave: true,
      }
    }}>
      <CMComponent
        configId="main_top"
        componentId={"text-block"}
        mode={"edit"}
      />
    </CMProvider>
  );
}
```

Run your project and go to http://localhost:3000 to see component gallery and edit mode.

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

The demo is using local file to persist data. It's only for demo purposes. In real project you should use your own persistence layer.

## How to develop package locally?

### setup project with npm link

You can use npm link to develop package locally.

1. Clone this repository
2. Run `npm install` in root directory
3. Run `npm install` in `demo-next` directory
4. run `npm link` in root directory
5. run `npm link react-content-manager` in `demo-next` directory

### run project in watch mode

1. Run `npm run watch` in root directory
2. Run `npm run dev` in `demo-next` directory

## NPM link

some useful commands in npm link

to list all npm links

```
npm ls -g --depth=0 --link=true
```

to remove npm link globally

```
npm unlink -g react-content-manager
```
