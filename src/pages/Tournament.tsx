import { PageContainer } from "@toolpad/core";
import TournamentSettings from "../components/TournamentSettings";
import { useEffect, useState } from "react";
import { IQuestion } from "../interfaces/IQuestion";

export default function Tournaments() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  useEffect(() => {
    console.log("TournamentQuestions:", questions);
  }, [questions]);

  return (
    <PageContainer>
      <TournamentSettings setQuestions={setQuestions} />
    </PageContainer>
  );
}
