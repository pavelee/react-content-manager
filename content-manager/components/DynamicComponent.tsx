import { Skeleton } from "./Skeleton";
import React, { Suspense, lazy } from "react";

interface DynamicComponentProps {
  componentPath: () => any;
  props?: any;
}

export const DynamicComponent = (props: DynamicComponentProps) => {
  // const MyComponent = dynamic(() => props.componentPath(), {
  //   loading: () => <Skeleton />,
  // });
  // console.log('test', props.componentPath());
  const MyComponent = lazy(() => props.componentPath());
  return (
    <Suspense fallback={<Skeleton />}>
      <MyComponent {...props.props} />
    </Suspense>
  );
};
