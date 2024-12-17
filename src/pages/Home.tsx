import { Typography, Button } from "@mui/material";
import { PageContainer } from "@toolpad/core";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageContainer title="Welcome to Quizzy!">
      <Typography>
        Are you ready to get dizzy from Quizzy? Then you've come to the right
        place!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/play")}
        sx={{ mt: 2, maxWidth: "fit-content" }}
      >
        Start quiz
      </Button>
    </PageContainer>
  );
}
