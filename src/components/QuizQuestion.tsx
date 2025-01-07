import { useEffect, useState } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Category } from "../enums/Category";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";
import { useSession } from "../SessionWrapper/useSession";
import axios from "axios";
import { ISpecificResult } from "../interfaces/ISpecificResult";
import { useResult } from "../ResultHook/useResult";

type Color =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "inherit"
  | "primary"
  | "secondary";

export default function QuizQuestion(props: {
  questions: IQuestion[];
  settings: { type: Type; category: Category; difficulty: Difficulty };
}) {
  const [index, setIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [localResult, setLocalResult] = useState<ISpecificResult>({
    type: props.settings.type,
    category: props.settings.category,
    difficulty: props.settings.difficulty,
    attempts: 0,
    successfulAttempts: 0,
    failedAttempts: 0,
  });
  const { setResult } = useResult();
  const [feedback, setFeedback] = useState("");
  const session = useSession();
  const COLORS: Color[] = ["success", "error", "warning", "inherit"];

  const shuffledColors = shuffleArray([...COLORS]);

  function decodeHtmlEntities(str: string) {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent || doc.body.textContent;
  }

  useEffect(() => {
    setUserAnswer(null);
  }, [index]);

  useEffect(() => {
    setResult(localResult);
  }, [localResult, setResult]);

  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const getAllAnswersAsArray = (): string[] => {
    const array = props.questions[index].incorrectAnswers;
    if (!array.includes(props.questions[index].correctAnswer)) {
      array.push(props.questions[index].correctAnswer);
    }
    return shuffleArray(array);
  };

  const handleClickAnswer = (answer: string) => {
    setUserAnswer(answer);
    if (answer === props.questions[index].correctAnswer) {
      setLocalResult((prevResult) => {
        return {
          ...prevResult,
          attempts: prevResult.attempts + 1,
          successfulAttempts: prevResult.successfulAttempts + 1,
        };
      });
      setFeedback("Correct! ✅");
    } else {
      setLocalResult((prevResult) => {
        return {
          ...prevResult,
          attempts: prevResult.attempts + 1,
          failedAttempts: prevResult.failedAttempts + 1,
        };
      });
      setFeedback(
        `Wrong! ❌ The correct answer was: ${decodeHtmlEntities(props.questions[index].correctAnswer)}`
      );
    }
  };

  const handleSaveResults = async () => {
    try {
      console.log(localResult);
      const response = await axios.post(
        `/api/results/${session.session?.user?.id}`,
        localResult
      );
      console.log(response);
      setLocalResult((prevResult) => {
        return {
          ...prevResult,
          attempts: 0,
          successfulAttempts: 0,
          failedAttempts: 0,
        };
      });
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  return (
    <Card sx={{ my: 1, p: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          {props.questions[index] ? (
            <Typography variant="h6" sx={{ ml: 1 }}>
              {props.questions[index].question
                ? decodeHtmlEntities(props.questions[index].question)
                : ""}
            </Typography>
          ) : (
            <></>
          )}

          {props.questions[index] ? (
            props.questions[index].type === "boolean" ? (
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="success"
                  disableRipple
                  disabled={userAnswer ? true : false}
                  onClick={() => handleClickAnswer("True")}
                  sx={{ p: 3, m: 1, textTransform: "none" }}
                >
                  True
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  disableRipple
                  disabled={userAnswer ? true : false}
                  onClick={() => handleClickAnswer("False")}
                  sx={{ p: 3, m: 1, textTransform: "none" }}
                >
                  False
                </Button>
              </Stack>
            ) : (
              getAllAnswersAsArray().map((answer, index) => {
                return (
                  <Button
                    key={index}
                    variant="contained"
                    color={shuffledColors[index]}
                    disableRipple
                    disabled={userAnswer ? true : false}
                    onClick={() => handleClickAnswer(answer)}
                    sx={{ p: 3, m: 1, textTransform: "none" }}
                  >
                    {decodeHtmlEntities(answer)}
                  </Button>
                );
              })
            )
          ) : (
            <></>
          )}
          {userAnswer && (
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                ml: 1,
                color: feedback === "Correct! ✅" ? "green" : "red",
              }}
            >
              {feedback}
            </Typography>
          )}
        </Box>
        <Card
          variant="outlined"
          sx={{ maxWidth: "fit-content", maxHeight: "fit-content", p: 1 }}
        >
          <CardHeader title="Settings" sx={{ p: 1, py: 0 }} />
          <Divider />
          <Typography
            sx={{ pt: 1 }}
          >{`Category: ${props.settings.category}`}</Typography>
          <Typography>{`Type: ${props.settings.type}`}</Typography>
          <Typography>{`Difficulty: ${props.settings.difficulty}`}</Typography>
        </Card>
      </Stack>
      {props.questions[index + 1] ? (
        <></>
      ) : (
        <Alert color="warning" sx={{ maxHeight: "fit-content", m: 1 }}>
          This was the last questions in this category, type and difficulty. To
          continue, please change a parameter to get new questions.
        </Alert>
      )}
      <CardActions>
        <Button
          variant="contained"
          sx={{ m: 1, ml: 0 }}
          onClick={handleSaveResults}
          disabled={session.session?.user ? false : true}
        >
          Save results
        </Button>
        <Button
          variant="contained"
          onClick={() => setIndex(index + 1)}
          sx={{ m: 1 }}
          disabled={
            props.questions[index + 1] ? (userAnswer ? true : false) : true
          }
        >
          Skip question
        </Button>
        <Button
          variant="contained"
          sx={{ m: 1 }}
          onClick={() => setIndex(index + 1)}
          disabled={
            props.questions[index + 1] ? (userAnswer ? false : true) : true
          }
        >
          Next
        </Button>
      </CardActions>
    </Card>
  );
}
