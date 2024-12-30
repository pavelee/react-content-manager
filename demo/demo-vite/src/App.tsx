import "./App.css";
import { CMProvider } from "react-content-manager";
import { AsyncCMComponent } from "react-content-manager/dist/esm/client/AsyncCMComponent";

function App() {
  return (
    <CMProvider mode={"edit"}>
      <AsyncCMComponent configId="123" componentId={"vite"} mode={"edit"} />
      <AsyncCMComponent
        configId="1234"
        componentId={"cat-facts"}
        mode={"edit"}
      />
      <AsyncCMComponent
        configId="12312321"
        componentId={"container"}
        mode={"edit"}
      />
    </CMProvider>
  );
}

export default App;
