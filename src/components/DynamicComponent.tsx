import { Skeleton } from "./Skeleton";
import React, { Suspense, lazy } from "react";

interface DynamicComponentProps {
  componentPath: () => any;
  props?: any;
}

export const DynamicComponent = (props: DynamicComponentProps) => {
  const MyComponent = lazy(() => props.componentPath());
  return (
    <Suspense
      key={props.componentPath.toString()}
      fallback={<Skeleton />}>
      <MyComponent {...props.props} />
    </Suspense>
  );
};
