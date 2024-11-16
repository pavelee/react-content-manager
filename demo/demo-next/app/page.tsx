import Image from "next/image";
import { CMComponent, CMProvider } from "react-content-manager";

type mode = "edit" | "view";

type props = {
  searchParams: {
    mode: mode;
  };
};

export default async function Home(props: props) {
  const { mode = "view" } = props.searchParams;
  return (
    <CMProvider mode={mode}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CMComponent
          configId="main_top1"
          componentId={"container"}
          mode={mode}
        />
        <CMComponent
          configId="main_top"
          componentId={"container"}
          mode={mode}
        />
      </main>
      //{" "}
    </CMProvider>
  );
}
