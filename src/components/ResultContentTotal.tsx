import { Box, Button, Stack, Typography, Card, Alert } from "@mui/material";
import { useSession } from "../SessionWrapper/useSession";
import axios from "axios";
import { useState } from "react";
import { ITotalResult } from "../interfaces/ITotalResult";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import ResultCard from "./ResultCard";

export default function ResultContentTotal() {
  const [totalResultResponse, setTotalResultResponse] = useState<
    ITotalResult | undefined
  >(undefined);
  const [totalResultError, setTotalResultError] = useState<unknown | undefined>(
    undefined
  );
  const { session } = useSession();

  const [view, setView] = useState<"start" | "chart">("start");

  const handleClickGetTotalResults = async (
    userId: string | null | undefined
  ) => {
    try {
      const response = await axios.get("/api/results/total", {
        params: { userId },
      });
      if (response.status === 200) {
        setTotalResultResponse(response.data);
        setView("chart");
      }
    } catch (error) {
      setTotalResultError(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      {session?.user?.id ? (
        <></>
      ) : (
        <Alert severity="warning" sx={{ mb: 2 }}>
          In order to get data from server, you need to be logged in.
        </Alert>
      )}
      {view === "start" ? (
        <Box display="flex" justifyContent="right">
          <Button
            variant="contained"
            onClick={() => handleClickGetTotalResults(session?.user?.id)}
            disabled={session ? false : true}
            sx={{ my: 1 }}
          >
            Get data and show
          </Button>
        </Box>
      ) : (
        <>
          {totalResultResponse ? (
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <ResultCard
                  text="Total Attempts"
                  result={totalResultResponse.totalAttempts.toString()}
                />
                <ResultCard
                  text="Total Successful Attempts"
                  result={totalResultResponse.totalSuccessfulAttempts.toString()}
                />
                <ResultCard
                  text="Total Failed Attempts"
                  result={totalResultResponse.totalFailedAttempts.toString()}
                />
              </Stack>
              <PieChart
                height={325}
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
                        value: totalResultResponse.totalSuccessfulAttempts,
                        color: "blue",
                        label: "Successful Attempts",
                      },
                      {
                        value: totalResultResponse.totalFailedAttempts,
                        color: "red",
                        label: "Failed Attempts",
                      },
                    ],
                    arcLabel: (item) => {
                      const percentage =
                        (item.value / totalResultResponse.totalAttempts) * 100;
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
            <>
              <Typography>{`No data for this user! Error: ${totalResultError}`}</Typography>
            </>
          )}
        </>
      )}
    </Card>
  );
}
