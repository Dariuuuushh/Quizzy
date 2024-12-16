import { useState } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import { Button, Paper, Typography } from "@mui/material";

export default function Quiz(props: { questions: IQuestion[] }) {
  const [index, setIndex] = useState<number>(0);

  return (
    <Paper sx={{ my: 1 }}>
      <Typography variant="h1">{`Category: ${props.questions[index].category}`}</Typography>
      <Typography variant="h1">{`Type: ${props.questions[index].type}`}</Typography>
      <Typography variant="h1">{`Difficulty: ${props.questions[index].difficilty}`}</Typography>
      <Paper>
        <Typography>{props.questions[index].question}</Typography>
      </Paper>
      {/* {props.questions.map((question, index) => (
        <Box key={question.id}>
          <Typography variant="h2">{`${index + 1}. ${
            question.question
          }`}</Typography>
        </Box>
      ))} */}
      <Button variant="contained" onClick={() => setIndex(index + 1)}>
        Confirm
      </Button>
    </Paper>
  );
}
