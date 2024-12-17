import { Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import QuizSettings from "../components/QuizSettings";
import QuizQuestion from "../components/QuizQuestion";
import { Category } from "../enums/Category";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";
import { PageContainer } from "@toolpad/core";

export type SettingsKey = "category" | "difficulty" | "type";

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
    <PageContainer title="Play Quizzy!">
      <Typography variant="h4" gutterBottom></Typography>
      <QuizSettings
        setQuestions={setQuestions}
        settings={settings}
        setSettings={setSettings}
      />
      {questions.length > 0 ? (
        <QuizQuestion questions={questions} settings={settings} />
      ) : (
        <></>
      )}
    </PageContainer>
  );
}

export default Play;
