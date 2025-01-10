import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Card,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";
import { Category } from "../enums/Category";
import axios from "axios";
import { useState, useEffect } from "react";
import { ISettings } from "../interfaces/ISettings";
import { ISpecificResult } from "../interfaces/ISpecificResult";
import { SettingsKey } from "../pages/Play";
import { useSession } from "../SessionWrapper/useSession";
import ResultCard from "./ResultCard";

export default function ResultContentTotal() {
  const { session, sessionSettings } = useSession();
  const [settings, setSettings] = useState<ISettings>({
    type: sessionSettings.type,
    category: sessionSettings.category,
    difficulty: sessionSettings.difficulty,
  });
  const [specificResultResponse, setSpecificResultResponse] = useState<
    ISpecificResult | undefined
  >(undefined);
  const [specificResultError, setSpecificResultError] = useState<
    unknown | undefined
  >(undefined);

  const [view, setView] = useState<"settings" | "chart">("settings");

  const updateSettings = <T extends string | number>(
    key: SettingsKey,
    value: T,
    enumType: { [key: string]: T }
  ) => {
    if (Object.values(enumType).includes(value)) {
      setSettings((oldValues) => ({
        ...oldValues,
        [key]: value,
      }));
    }
  };

  useEffect(() => {
    setSpecificResultResponse(undefined);
    setSpecificResultError(undefined);
  }, [settings]);

  const handleChangeCategory = (event: SelectChangeEvent<Category>) => {
    updateSettings("category", event.target.value, Category);
  };

  const handleChangeDifficulty = (event: SelectChangeEvent<Difficulty>) => {
    updateSettings("difficulty", event.target.value, Difficulty);
  };

  const handleChangeType = (event: SelectChangeEvent<Type>) => {
    updateSettings("type", event.target.value, Type);
  };

  const handleClickSave = async (
    userId: string | null | undefined,
    category: Category,
    difficulty: Difficulty,
    type: Type
  ) => {
    try {
      const response = await axios.get("/api/results/specific", {
        params: { userId, category, type, difficulty },
      });
      if (response.data) {
        setSpecificResultResponse(response.data);
        setView("chart");
      }
    } catch (error) {
      setSpecificResultError(error);
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
      {view === "settings" ? (
        <>
          <Stack direction="row" spacing={2}>
            <FormControl variant="filled" fullWidth sx={{ m: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select value={settings.category} onChange={handleChangeCategory}>
                {Object.values(Category).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" fullWidth sx={{ m: 1 }}>
              <InputLabel>Difficulty</InputLabel>
              <Select
                value={settings.difficulty}
                onChange={handleChangeDifficulty}
              >
                {Object.values(Difficulty).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="filled" fullWidth sx={{ m: 1 }}>
              <InputLabel>Type</InputLabel>
              <Select value={settings.type} onChange={handleChangeType}>
                {Object.values(Type).map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Box display="flex" justifyContent="right">
            <Button
              variant="contained"
              onClick={() =>
                handleClickSave(
                  session?.user?.id,
                  settings.category,
                  settings.difficulty,
                  settings.type
                )
              }
              disabled={session && !specificResultError ? false : true}
              sx={{ my: 1 }}
            >
              {specificResultError ? "Change values to continue" : "Save"}
            </Button>
          </Box>
          {specificResultError ? (
            <Card variant="outlined" sx={{ p: 2 }}>
              There are no results for this user in this category, difficulty
              and type!
            </Card>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {specificResultResponse ? (
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={1}>
                <ResultCard
                  text="Category"
                  result={specificResultResponse.category}
                />
                <ResultCard
                  text="Difficulty"
                  result={specificResultResponse.difficulty}
                />
                <ResultCard text="Type" result={specificResultResponse.type} />
                <ResultCard
                  text="Attempts"
                  result={specificResultResponse.attempts.toString()}
                />
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
                        value: specificResultResponse.successfulAttempts,
                        color: "blue",
                        label: "Successful Attempts",
                      },
                      {
                        value: specificResultResponse.failedAttempts,
                        color: "red",
                        label: "Failed Attempts",
                      },
                    ],
                    arcLabel: (item) => {
                      const percentage =
                        (item.value / specificResultResponse.attempts) * 100;
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
            <></>
          )}
          <Box display="flex" justifyContent="right">
            <Button variant="outlined" onClick={() => setView("settings")}>
              Back to Settings
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
}
