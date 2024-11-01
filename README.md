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
  componentPath: () => import("@/app/components/TextBlock"), // path to component that will be rendered
  formPath: () => import("@/app/components/Form"), // path to component with form that will be use to edit component props
  readProps: () => import("@/app/components/ReadProps"), // path to function that will deserialize component props from your persistance layer
  writeProps: () => import("@/app/components/WriteProps"), // path to function that will serialize component props to your persistance layer
  tags: ["content", "alert"], // tags that will be used to filter components in component gallery
});

export default cmConfig;
```

### Create cm.persister.ts in your root directory.

`Architecture Note:
We are separating persister from configuration because of nature of React Server Component. We need to asure it will work on client side, because component edition need interactivity`

```javascript
"use client";

const persister = async (configId: string, componentId: string, data: any) => {
  const d = await fetch(`/YOUR_API_ADDRESS`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      configId,
      componentId,
      data,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return {};
    });
};

export default persister;

```

### Create cm.fetcher.ts in your root directory.

`Architecture Note:
We are separating persister from configuration because of nature of React Server Component. We need to asure it will work on client side, because component edition need interactivity`

As you can see below, we are using `server-only` import. It's a the decision that code will always run on the server side. It's possible with the Next.js usage.

```javascript
import "server-only";

import { SiteDetector } from "@/_config/site";
import client from "@/_features/prismadb/prismadb";

const fetcher = async (configId: string): Promise<any> => {
  const site = await SiteDetector.detect();
  const d = await client.contentManager.findFirst({
    where: {
      id: configId,
      site_id: site.getId(),
    },
  });

  if (!d) {
    return {};
  }

  return d;
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
