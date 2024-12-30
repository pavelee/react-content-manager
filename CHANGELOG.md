# react-content-manager

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
