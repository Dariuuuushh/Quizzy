import { useState } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import QuizSettings from "../components/QuizSettings";
import QuizQuestion from "../components/QuizQuestion";
import { PageContainer } from "@toolpad/core";

export type SettingsKey = "category" | "difficulty" | "type";

export default function Play() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  return (
    <PageContainer title="Play Quizzy!">
      <QuizSettings setQuestions={setQuestions} />
      {questions.length > 0 ? <QuizQuestion questions={questions} /> : <></>}
    </PageContainer>
  );
}
