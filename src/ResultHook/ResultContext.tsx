import { createContext } from "react";
import { ISpecificResult } from "../interfaces/ISpecificResult";

interface ResultContextType {
  result: ISpecificResult;
  setResult: React.Dispatch<React.SetStateAction<ISpecificResult>>;
}

// Initialisiere den Context mit `undefined` für den Anfang
export const ResultContext = createContext<ResultContextType | undefined>(
  undefined
);
