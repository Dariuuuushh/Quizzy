import { useEffect, useState } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "../SessionWrapper/useSession";
import axios from "axios";
import { useResult } from "../ResultHook/useResult";
import { useDialogs } from "@toolpad/core";
import { blue } from "@mui/material/colors";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { Type } from "../enums/Type";
import ResultCard from "./ResultCard";
import { useNavigate } from "react-router-dom";
import Timer from "./Timer";

type Color =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "inherit"
  | "primary"
  | "secondary";

export default function QuizQuestion(props: { questions: IQuestion[] }) {
  const [index, setIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const { result, setResult } = useResult();
  const [feedback, setFeedback] = useState<JSX.Element>(<></>);
  const { session, sessionSettings } = useSession();
  const dialogs = useDialogs();
  const navigate = useNavigate();
  const COLORS: Color[] = ["success", "error", "warning", "inherit"];
  const [answers, setAnswers] = useState<string[]>([]);
  const shuffledColors = shuffleArray([...COLORS]);
  const [colors] = useState(() => shuffledColors);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [timerStopped, setTimerStopped] = useState<boolean>(false);
  const [resetTimer, setResetTimer] = useState<boolean>(false);

  useEffect(() => {
    console.log(timerStopped);
  }, [timerStopped]);

  useEffect(() => {
    setUserAnswer(null);
    setSelectedAnswerIndex(null);
    setTimerStopped(false);
    setResetTimer(true);
  }, [index]);

  useEffect(() => {
    setFeedback(<></>);
    setUserAnswer(null);
    setSelectedAnswerIndex(null);
    setTimerStopped(false);
  }, [sessionSettings]);

  useEffect(() => {
    if (props.questions[index]) {
      const array = props.questions[index].incorrectAnswers;
      if (!array.includes(props.questions[index].correctAnswer)) {
        array.push(props.questions[index].correctAnswer);
      }
      setAnswers(shuffleArray(array));
    } else {
      console.error("No questions for these Settings");
    }
  }, [index, props.questions]);

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

  const decodeHtmlEntities = (str: string) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent || doc.body.textContent;
  };

  const handleClickAnswer = (answer: string) => {
    setUserAnswer(answer);
    setTimerStopped(true);
    if (answer === props.questions[index].correctAnswer) {
      setResult((prevResult) => {
        return {
          ...prevResult,
          attempts: prevResult.attempts + 1,
          successfulAttempts: prevResult.successfulAttempts + 1,
        };
      });
      setFeedback(
        <Alert
          icon={<Check fontSize="inherit" />}
          severity="success"
          variant="filled"
          sx={{
            m: 1,
            p: 2,
            mt: 2,
            ml: sessionSettings.type === Type.multiple ? 6 : 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          Correct!
        </Alert>
      );
    } else {
      setResult((prevResult) => {
        return {
          ...prevResult,
          attempts: prevResult.attempts + 1,
          failedAttempts: prevResult.failedAttempts + 1,
        };
      });
      setFeedback(
        <Alert
          icon={<Close />}
          variant="filled"
          severity="error"
          sx={{
            m: 1,
            p: 2,
            mt: 2,
            ml: sessionSettings.type === Type.multiple ? 6 : 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {`Wrong! The correct answer was: ${decodeHtmlEntities(props.questions[index].correctAnswer)}`}
        </Alert>
      );
    }
  };

  const handleSaveResults = async () => {
    try {
      const response = await axios.post(
        `/api/results/${session?.user?.id}`,
        result
      );
      if (response.status === 200) {
        dialogs.alert("Results were saved!");
        setResult((prevResult) => {
          return {
            ...prevResult,
            attempts: 0,
            successfulAttempts: 0,
            failedAttempts: 0,
          };
        });
      }
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  return (
    <Card sx={{ my: 1, p: 1 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box width={1}>
          {props.questions[index] ? (
            <Card
              variant="outlined"
              sx={{
                boxShadow: 3,
                m: 1,
                ml: sessionSettings.type === Type.multiple ? 6 : 1,
              }}
            >
              <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Quiz Question:
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {props.questions[index]?.question
                    ? decodeHtmlEntities(props.questions[index].question)
                    : ""}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <></>
          )}

          {props.questions[index] ? (
            props.questions[index].type === "boolean" ? (
              <Stack spacing={2} margin={1}>
                <Button
                  variant="contained"
                  color="success"
                  disableRipple
                  fullWidth
                  disabled={userAnswer ? true : false}
                  onClick={() => {
                    setSelectedAnswerIndex(0);
                    handleClickAnswer("True");
                  }}
                  sx={{
                    p: 3,
                    textTransform: "none",
                    border:
                      selectedAnswerIndex === 0 ? "2px solid red" : undefined,
                  }}
                >
                  True
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  disableRipple
                  fullWidth
                  disabled={userAnswer ? true : false}
                  onClick={() => {
                    setSelectedAnswerIndex(1);
                    handleClickAnswer("False");
                  }}
                  sx={{
                    p: 3,
                    textTransform: "none",
                    border:
                      selectedAnswerIndex === 1 ? "2px solid red" : undefined,
                  }}
                >
                  False
                </Button>
              </Stack>
            ) : (
              <Stack>
                {answers.map((answer, index) => {
                  return (
                    <Stack
                      direction="row"
                      display="flex"
                      alignItems="center"
                      key={index}
                    >
                      <Avatar sx={{ bgcolor: blue[500] }}>
                        {["A", "B", "C", "D"][index] || ""}
                      </Avatar>
                      <Button
                        variant="contained"
                        color={colors[index]}
                        disableRipple
                        fullWidth
                        disabled={!!userAnswer || timerStopped}
                        onClick={() => {
                          setSelectedAnswerIndex(index);
                          handleClickAnswer(answer);
                        }}
                        sx={{
                          p: 3,
                          m: 1,
                          textTransform: "none",
                          border:
                            selectedAnswerIndex === index
                              ? "2px solid red"
                              : undefined,
                        }}
                      >
                        {decodeHtmlEntities(answer)}
                      </Button>
                    </Stack>
                  );
                })}
              </Stack>
            )
          ) : (
            <></>
          )}
          {userAnswer && feedback}
        </Box>
        <Stack spacing={1} sx={{ mt: 1, mr: 2 }}>
          <Timer
            duration={10}
            timerStopped={timerStopped}
            setTimerStopped={setTimerStopped}
            resetTimer={resetTimer}
            setResetTimer={setResetTimer}
          />
          <Stack
            spacing={0}
            direction="row"
            sx={{ alignItems: "stretch", display: "flex" }}
          >
            <Box flex={1} sx={{ alignItems: "stretch" }}>
              <ResultCard text="Category" result={sessionSettings.category} />
            </Box>
            <Box flex={1} sx={{ alignItems: "stretch", display: "flex" }}>
              <ResultCard
                text="Difficulty"
                result={sessionSettings.difficulty}
              />
            </Box>
            <Box flex={1} sx={{ alignItems: "stretch", display: "flex" }}>
              <ResultCard text="Type" result={sessionSettings.type} />
            </Box>
          </Stack>
          <ResultCard
            text="Local Attempts"
            result={result.attempts.toString()}
          />
        </Stack>
      </Stack>
      {props.questions[index + 1] ? (
        <></>
      ) : (
        <Alert
          severity="warning"
          variant="filled"
          sx={{ maxHeight: "fit-content", m: 1 }}
        >
          This was the last question in these settings. In order to continue,
          please change a parameter to get new questions.
        </Alert>
      )}
      <CardActions>
        <Stack
          direction="row"
          display="flex"
          justifyContent="space-between"
          width={1}
        >
          <Stack direction="row">
            <Button
              variant="contained"
              sx={{ m: 1, ml: 0 }}
              onClick={handleSaveResults}
              disabled={session?.user ? false : true}
            >
              Save results
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setIndex(index + 1);
              }}
              sx={{ m: 1 }}
              disabled={props.questions[index + 1] ? !!userAnswer : true}
            >
              Skip question
            </Button>
            <Button
              variant="contained"
              sx={{ m: 1 }}
              onClick={() => {
                setIndex(index + 1);
              }}
              disabled={
                props.questions[index + 1] ? (userAnswer ? false : true) : true
              }
            >
              Next
            </Button>
          </Stack>
          <Button
            variant="contained"
            sx={{ m: 1, justifySelf: "right" }}
            onClick={() => navigate("../results/localResults")}
            disabled={result.attempts === 0 ? true : false}
          >
            See local results
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
}
