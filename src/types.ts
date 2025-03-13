import { ReactNode } from "react";

export type ProviderConfig = {
  nextjs?: {
    useRouterRefreshOnSave?: boolean;
  };
};

export type ConfigReturnType = {
  // should display component on page
  active?: boolean;
  // add extra comment to current status so user can understand why component is not visible
  statusComment?: ReactNode;
};

export type ComponentDetails = {
  id: string;
  name: string;
  desc?: string;
} & ConfigReturnType;

export type ComponentDetailsList = ComponentDetails[];
