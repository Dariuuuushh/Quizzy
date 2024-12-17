import { useRouteError } from "react-router-dom";
import { Container, Typography, Box, Paper, Button } from "@mui/material";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
        <Box>
          <Typography variant="h3" color="error" gutterBottom>
            Oops!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Sorry, an unexpected error has occurred.
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontStyle: "italic" }}
          >
            {error.statusText || error.message || "Unknown Error"}
          </Typography>
          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => (window.location.href = "/")} // Redirect to homepage
            >
              Go to Homepage
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
