import { AppProvider } from "@toolpad/core/AppProvider";
import {
  AuthResponse,
  SignInPage,
  type AuthProvider,
} from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const providers = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
  { id: "facebook", name: "Facebook" },
  { id: "twitter", name: "Twitter" },
  { id: "linkedin", name: "LinkedIn" },
];

const signIn: (provider: AuthProvider) => void | Promise<AuthResponse> = async (
  provider
) => {
  const promise = new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      if (provider.id === "google") {
        console.log(`Successfully signed in with ${provider.name}`);
        resolve({});
      } else {
        resolve({ error: "Unsupported provider" });
      }
    }, 500);
  });
  return promise;
};

export default function OAuthSignInPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
      <Button
        className="mama"
        variant="contained"
        sx={{ m: 1 }}
        onClick={() => navigate("/play")}
      >
        Abbrechen
      </Button>
    </AppProvider>
  );
}
