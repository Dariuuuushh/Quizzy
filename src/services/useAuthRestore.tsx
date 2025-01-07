import { useEffect } from "react";
import axios from "axios";
import { useSession } from "../SessionWrapper/useSession";

export function useAuthRestore() {
  const { setSession } = useSession();

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await axios.get("/api/validateToken", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            const user = response.data.user;
            setSession({
              user: {
                id: user.id.toString(),
                email: user.email,
                name: user.username,
              },
            });
          } else {
            localStorage.removeItem("authToken");
            setSession(null);
          }
        } catch (error) {
          console.error("Error restoring session:", error);
          localStorage.removeItem("authToken");
          setSession(null);
        }
      }
    };

    restoreSession();
  }, [setSession]);
}
