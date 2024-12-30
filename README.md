# react-content-manager

## Important!

**Package is now ONLY compatible with Next.js framework and React Server Components**. Still working on integration with other frameworks.

Package is now stable, it could be used on production.

## What is it?

React Content Manager is a package that allows you to build your app from manageable components, that can be edited by users for their needs.

## Roadmap

- Add support to customize UI of the package
- Drop antd library for smaller size of the package

## How to use it?

### Install package using npm or yarn

```
npm install react-content-manager
```

### As small as possible example

### Create TextEdit component (simple example)

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

const Component = async (props: ComponentProps) => {
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

### Create cm.config.js file in your project root directory and export your configuration. Example configuration:

```javascript
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

### Create cm.persister.ts in your root directory.

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

### Create cm.fetcher.ts in your root directory.

`Architecture Note:
As you can see below, we are using `server-only` import. It's a the decision that code will always run on the server side. It's possible with the Next.js usage.

```javascript
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

### Edit your page.tsx and wrap your page with CmProvider. Example:

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

### Run your project and go to http://localhost:3000/your-page-route to see component gallery and edit mode.

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
