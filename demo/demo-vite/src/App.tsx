import "./App.css";
import { CMProvider } from "react-content-manager";
import { ClientCMComponent } from "react-content-manager/dist/esm/client";

function App() {
  return (
    <CMProvider mode={"edit"}>
      <ClientCMComponent configId="123" componentId={"vite"} mode={"edit"} />
      <ClientCMComponent
        configId="1234"
        componentId={"cat-facts"}
        mode={"edit"}
      />
      <ClientCMComponent
        configId="12312321"
        componentId={"container"}
        mode={"edit"}
      />
    </CMProvider>
  );
}

export default App;
