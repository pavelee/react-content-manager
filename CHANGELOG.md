# react-content-manager

## 3.3.0

- Added new config callback that allow you to pass custom config to components, on start we have option to deactivate component on site and add status comment to explain eg. why component is not active.

## 3.2.0

- Added config object to CMProvider
- Added config option to enable Nextjs router refresh on save

## 3.1.2

- fixed error in docs

## 3.1.1

- bump deps

## 3.1.0

### Minor changes

- Added support for React 19 with antd (adapter)
- Added instruction to use `@ant-design/v5-patch-for-react-19` to use antd with React 19

## 3.0.0

### Major changes

- New way of setting entrance files for library, right now you can pass path to files inside bundler configuration. **Check README for more information how to upgrade**
- Change name from AsyncCMComponent to ClientCMComponent to make it more clear as usage on client side instead of server one.

## 2.3.0

### Minor changes

- Updated spec bumps
- Added support for React 19 with antd (adapter)

## 2.2.1

### Patch changes

- Updated README about using next.js router to refresh RSC components to see changes

## 2.2.0

### Minor Changes

- Removed support to execute useRouter from next.js, because it blocked way to work with Vite and forces developer to always refresh RSC (react server components). If you want to still have this feature you can pass it inside onSuccess/onFailure as params of saveChange

## 2.1.5

### Patch Changes

- Clean up in readme, better starting example provided

## 2.1.4

### Patch Changes

- Fixed to use flex wrap when direction is set to row, so content will be responsive on smaller device by default

## 2.1.3

### Patch Changes

- 3121c63: better tools
