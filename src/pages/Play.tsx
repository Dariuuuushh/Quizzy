import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import QuizSettings from "../components/QuizSettings";
import Quiz from "../components/Quiz";
import { Category } from "../enums/Category";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";

function Play() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [settings, setSettings] = useState<{
    type: Type;
    category: Category;
    difficulty: Difficulty;
  }>({
    type: Type.multiple,
    category: Category.General_Knowledge,
    difficulty: Difficulty.medium,
  });

  useEffect(() => {
    console.log("Questions", questions);
  }, [questions]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Play Quizzy!
      </Typography>
      <QuizSettings
        setQuestions={setQuestions}
        settings={settings}
        setSettings={setSettings}
      />
      {questions ? <Quiz questions={questions} /> : <></>}
    </Box>
  );
}

export default Play;
