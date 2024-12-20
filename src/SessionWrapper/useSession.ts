import { useContext } from "react";
import SessionWrapperContext  from "./SessionWrapperContext";

export const useSession = () => {
  const context = useContext(SessionWrapperContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionWrapperProvider");
  }
  return context;
};
