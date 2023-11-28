import { CMComponent, CMProvider } from "react-content-manager";

export default function Home() {
  return (
    <CMProvider mode={"edit"}>
      <CMComponent
        configId="main_top"
        componentId={"text-block"}
        mode={"edit"}
      />
    </CMProvider>
  );
}
