import { Skeleton } from "./Skeleton";
import React, { Suspense, lazy } from "react";

interface DynamicComponentProps {
  componentId: string;
  componentPath: () => any;
  props?: any;
}


export const DynamicComponent = (props: DynamicComponentProps) => {
  const MyComponent = lazy(() => props.componentPath());
  return (
    <Suspense
      key={props.componentId}
      fallback={<Skeleton />}>
      <MyComponent {...props.props} />
    </Suspense>
  );
};
