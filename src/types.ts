export type ProviderConfig = {
  nextjs?: {
    useRouterRefreshOnSave?: boolean;
  };
};

export type ComponentDetails = {
  id: string;
  name: string;
  active: boolean;
  desc?: string;
};

export type ComponentDetailsList = ComponentDetails[];
