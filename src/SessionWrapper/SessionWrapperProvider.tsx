import React, { useState, useMemo, ReactNode } from "react";
import { Session } from "@toolpad/core/AppProvider";
import SessionWrapperContext from "./SessionWrapperContext";
import { ISettings } from "../interfaces/ISettings";
import { Difficulty } from "../enums/Difficulty";
import { Category } from "../enums/Category";
import { Type } from "../enums/Type";

export const SessionWrapperProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);
  const [sessionSettings, setSessionSettings] = useState<ISettings>({
    type: Type.multiple,
    category: Category.General_Knowledge,
    difficulty: Difficulty.medium,
  });

  const value = useMemo(
    () => ({
      session: session,
      setSession: setSession,
      sessionSettings: sessionSettings,
      setSessionSettings: setSessionSettings,
    }),
    [session, sessionSettings]
  );

  return (
    <SessionWrapperContext.Provider value={value}>
      {children}
    </SessionWrapperContext.Provider>
  );
};
