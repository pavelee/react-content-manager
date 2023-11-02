import React from "react";
import { Button, Drawer, Switch } from "antd";

interface ViewPageProps {
  children: React.ReactNode;
}

export const ViewPage = (props: ViewPageProps) => {

  return (
    <div>
      {props.children}
    </div>
  );
};
