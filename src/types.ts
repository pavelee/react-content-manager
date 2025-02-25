export type ProviderConfig = {
  nextjs?: {
    useRouterRefreshOnSave?: boolean;
  };
};

export type ComponentDetails = {
  id: string;
  name: string;
  desc?: string;
};

export type ComponentDetailsList = ComponentDetails[];
