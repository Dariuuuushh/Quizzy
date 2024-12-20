import { createContext } from "react";
import { Session } from "@toolpad/core/AppProvider";

type SessionWrapperContextType = {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
};

const SessionWrapperContext = createContext<
  SessionWrapperContextType | undefined
>(undefined);

export default SessionWrapperContext;
