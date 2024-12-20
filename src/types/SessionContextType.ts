import { Session } from "@toolpad/core/AppProvider";

type SessionContextType = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export default SessionContextType;