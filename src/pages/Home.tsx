import { Box, Typography, Button } from "@mui/material";

function Home() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Willkommen bei Quizzy!
      </Typography>
      <Typography>
        Teste dein Wissen mit unseren spannenden Quizfragen.
      </Typography>
      <Button variant="contained" color="primary">
        Quiz starten
      </Button>
    </Box>
  );
}

export default Home;
