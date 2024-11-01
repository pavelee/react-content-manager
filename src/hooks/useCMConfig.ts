import { useContext } from "react";
import { CMConfigContext } from "../context/CMConfigContext";

export const useCMConfig = () => {
  const context = useContext(CMConfigContext);

  if (context === undefined) {
    throw new Error(
      "useCMConfig must be used within a CMConfigContextProvider",
    );
  }

  return context;
};
