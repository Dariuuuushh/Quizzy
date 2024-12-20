import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSession } from "../SessionWrapper/useSession";

export default function CredentialsSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setSession } = useSession();

  const providers = [{ id: "credentials", name: "Email and Password" }];

  const signIn: (provider: AuthProvider, formData: FormData) => void = async (
    provider,
    formData
  ) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch("api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Successfully logged in!");
        localStorage.setItem("authToken", data.token);
        if (email) {
          setSession({
            user: {
              email: email.toString(),
            },
          });
        }
        navigate("/play");
      } else {
        alert("Error during registration: " + data.error);
        setSession(null);
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("An error has occurred.");
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
