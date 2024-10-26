import { Skeleton } from "./Skeleton";
import React, { Suspense, lazy } from "react";

interface DynamicComponentProps {
  componentPath: () => any;
  props?: any;
  useSuspense?: boolean;
}

export const DynamicComponent = (props: DynamicComponentProps) => {
  const { useSuspense = true } = props;
  const MyComponent = lazy(() => props.componentPath());

  if (useSuspense) {
    return (
      <Suspense key={props.componentPath.toString()} fallback={<Skeleton />}>
        <MyComponent {...props.props} />
      </Suspense>
    );
  }

  return <MyComponent {...props.props} />;
};
