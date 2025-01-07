import { useContext } from "react";
import { ResultContext } from "./ResultContext";

export const useResult = () => {
    const context = useContext(ResultContext);
    if (!context) {
      throw new Error("useResult must be used within a ResultProvider");
    }
    return context;
  };