import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSession } from "../SessionWrapper/useSession";
import axios from "axios";
import { useDialogs } from "@toolpad/core";

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setSession } = useSession();
  const dialogs = useDialogs();

  const providers = [{ id: "credentials", name: "Email and Password" }];

  const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    _provider,
    formData
  ) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post("api/signin", {
        email,
        password,
      });

      const data = await response.data;

      if (response.status === 200) {
        dialogs.alert("Successfully logged in!");
        localStorage.setItem("authToken", data.token);
        if (email) {
          setSession({
            user: {
              id: data.user.id.toString(),
              email: email.toString(),
              name: data.user.username,
            },
          });
        }
        navigate("/play");
      } else {
        dialogs.alert("Error during registration: " + data.error);
        setSession(null);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      dialogs.alert("An error has occurred.");
      setSession(null);
    }
  };

  return (
    <AppProvider theme={theme}>
      <IconButton size="large" onClick={() => navigate("/home")}>
        <ArrowBackIcon />
      </IconButton>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
      />
    </AppProvider>
  );
}
