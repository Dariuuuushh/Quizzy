import { useState } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import QuizSettings from "../components/QuizSettings";
import QuizQuestion from "../components/QuizQuestion";
import { Category } from "../enums/Category";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";
import { PageContainer } from "@toolpad/core";
import { ISettings } from "../interfaces/ISettings";

export type SettingsKey = "category" | "difficulty" | "type";

export default function Play() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [settings, setSettings] = useState<ISettings>({
    type: Type.multiple,
    category: Category.General_Knowledge,
    difficulty: Difficulty.medium,
  });

  return (
    <PageContainer title="Play Quizzy!">
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
