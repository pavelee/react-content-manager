import "./App.css";
import { CMProvider } from "react-content-manager";
import { AsyncCMComponent } from "react-content-manager/dist/esm/index.client";

function App() {
  return (
    <CMProvider mode={"edit"}>
      <AsyncCMComponent configId="123" componentId={"vite"} mode={"edit"} />
      <AsyncCMComponent
        configId="12312321"
        componentId={"container"}
        mode={"edit"}
      />
    </CMProvider>
  );
}

export default App;
