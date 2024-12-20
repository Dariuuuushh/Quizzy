import React, { useState, useMemo, ReactNode } from "react";
import { Session } from "@toolpad/core/AppProvider";
import SessionWrapperContext from "./SessionWrapperContext";

export const SessionWrapperProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<Session | null>(null);

  const value = useMemo(
    () => ({
      session: session,
      setSession: setSession,
    }),
    [session]
  );

  return (
    <SessionWrapperContext.Provider value={value}>
      {children}
    </SessionWrapperContext.Provider>
  );
};
