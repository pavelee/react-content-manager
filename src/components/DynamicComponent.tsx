import { ComponentDetailsList } from "../types";
import { Skeleton } from "./Skeleton";
import React, { Suspense, lazy } from "react";

interface DynamicComponentProps {
  componentPath: () => any;
  props?: any;
  useSuspense?: boolean;
  configId?: string;
  componentId?: string;
  components?: ComponentDetailsList;
}

export const DynamicComponent = (props: DynamicComponentProps) => {
  const { useSuspense = true } = props;
  const MyComponent = lazy(() => props.componentPath());

  if (useSuspense) {
    return (
      <Suspense key={props.componentPath.toString()} fallback={<Skeleton />}>
        <MyComponent
          {...props.props}
          configId={props.configId}
          componentId={props.componentId}
          components={props.components}
        />
      </Suspense>
    );
  }

  return <MyComponent {...props.props} />;
};
