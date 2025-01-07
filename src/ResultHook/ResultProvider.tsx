import { ReactNode, useState } from "react";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";
import { ISpecificResult } from "../interfaces/ISpecificResult";
import { ResultContext } from "./ResultContext";
import { Category } from "../enums/Category";

export const ResultProvider = ({ children }: { children: ReactNode }) => {
  const [result, setResult] = useState<ISpecificResult>({
    type: Type.multiple,
    category: Category.General_Knowledge,
    difficulty: Difficulty.medium,
    attempts: 0,
    successfulAttempts: 0,
    failedAttempts: 0,
  });

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
};
