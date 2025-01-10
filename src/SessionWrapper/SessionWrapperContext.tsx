import { createContext } from "react";
import { Session } from "@toolpad/core/AppProvider";
import { ISettings } from "../interfaces/ISettings";

type SessionWrapperContextType = {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
  sessionSettings: ISettings;
  setSessionSettings: (newSettings: ISettings) => void;
};

const SessionWrapperContext = createContext<
  SessionWrapperContextType | undefined
>(undefined);

export default SessionWrapperContext;
