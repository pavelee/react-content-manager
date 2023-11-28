import React from "react";

interface ViewPageProps {
  children: React.ReactNode;
}

export const ViewPage = (props: ViewPageProps) => {
  return <div>{props.children}</div>;
};
