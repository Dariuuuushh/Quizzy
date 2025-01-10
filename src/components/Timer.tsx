import { useState, useEffect, Dispatch, SetStateAction } from "react";
import {
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

export default function Timer(props: {
  duration: number;
  timerStopped: boolean;
  setTimerStopped: Dispatch<SetStateAction<boolean>>;
  resetTimer: boolean;
  setResetTimer: Dispatch<SetStateAction<boolean>>;
}) {
  const [timeLeft, setTimeLeft] = useState(props.duration);

  useEffect(() => {
    if (timeLeft === 0) {
      props.setTimerStopped(true);
    }
    if (props.resetTimer) {
      setTimeLeft(props.duration);
      props.setTimerStopped(false);
      props.setResetTimer(false);
    }
    const timerId = setInterval(() => {
      if (timeLeft > 0 && !props.timerStopped) {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [timeLeft, props]);

  return (
    <Card
      variant="outlined"
      sx={{ p: 1, height: "fit-content", width: 1, display: "flex" }}
    >
      <CardContent
        sx={{
          "&:last-child": { pb: 2 },
          display: "flex",
          width: 1,
        }}
      >
        <Stack spacing={1} width={1} justifyContent="center">
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ marginBottom: "8px !important" }}
          >
            Time left:
          </Typography>
          <CircularProgress
            variant="determinate"
            color="warning"
            value={(timeLeft / props.duration) * 100}
            thickness={5}
            sx={{ margin: "auto !important" }}
          />
          <Typography
            variant="h6"
            textAlign="center"
          >{`${timeLeft}s`}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
