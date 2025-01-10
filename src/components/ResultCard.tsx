import { Card, CardContent, Typography } from "@mui/material";

export default function ResultCard(props: { text: string; result: string }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ "&:last-child": { pb: 2 } }}>
        <Typography gutterBottom variant="h6" textAlign="center">
          {props.text}
        </Typography>
        <Typography variant="body2" textAlign="center">
          {props.result}
        </Typography>
      </CardContent>
    </Card>
  );
}
