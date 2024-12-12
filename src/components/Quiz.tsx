import React, { useEffect, useState } from "react";
import { fetchQuestions } from "../services/api";
import { IQuestion } from "../interfaces/IQuestion";
import { Box, Typography } from "@mui/material";

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  return (
    <Box>
      <Typography variant="h1">Quiz</Typography>
      {questions.map((question, index) => (
        <Box key={question.id}>
          <Typography variant="h2">{`${index + 1}. ${
            question.text
          }`}</Typography>
          <ul>
            {question.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default Quiz;
