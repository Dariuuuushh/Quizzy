import { Stack, Typography, Card } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { useResult } from "../ResultHook/useResult";
import ResultCard from "./ResultCard";

export default function ResultContentLocal() {
  const { result } = useResult();

  return (
    <Card sx={{ padding: 3 }}>
      {result.attempts !== 0 ? (
        <Stack direction="row" spacing={1}>
          <Stack direction="column" spacing={1}>
            <ResultCard text="Category" result={result.category} />
            <ResultCard text="Difficulty" result={result.difficulty} />
            <ResultCard text="Type" result={result.type} />
            <ResultCard text="Attempts" result={result.attempts.toString()} />
          </Stack>
          <PieChart
            height={425}
            width={550}
            sx={{
              p: 2,
              [`& .${pieArcLabelClasses.root}`]: {
                fontWeight: "bold",
              },
            }}
            series={[
              {
                data: [
                  {
                    value: result.successfulAttempts,
                    color: "blue",
                    label: "Successful Attempts",
                  },
                  {
                    value: result.failedAttempts,
                    color: "red",
                    label: "Failed Attempts",
                  },
                ],
                arcLabel: (item) => {
                  const percentage = (item.value / result.attempts) * 100;
                  return Number.isInteger(percentage)
                    ? `${percentage}%`
                    : `${percentage.toFixed(2)}%`;
                },
                arcLabelMinAngle: 35,
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 1,
                cornerRadius: 5,
              },
            ]}
          />
        </Stack>
      ) : (
        <Typography>
          No results yet. In order to see results, you need to play Quizzy!
          Please note, that the local results are resetted, when you save the
          data or change your settings.
        </Typography>
      )}
    </Card>
  );
}
