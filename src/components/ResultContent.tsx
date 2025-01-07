import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useResult } from "../ResultHook/useResult";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";
import { Category } from "../enums/Category";
import { SettingsKey } from "../pages/Play";
import { useSession } from "../SessionWrapper/useSession";
import axios from "axios";
import { ISpecificResult } from "../interfaces/ISpecificResult";
import { ISettings } from "../interfaces/ISettings";
import { ITotalResult } from "../interfaces/ITotalResult";

export default function ResultContent() {
  const [settings, setSettings] = useState<ISettings>({
    type: Type.multiple,
    category: Category.General_Knowledge,
    difficulty: Difficulty.medium,
  });
  const [specificResultResponse, setSpecificResultResponse] = useState<
    ISpecificResult | undefined
  >(undefined);
  const [specificResultError, setSpecificResultError] = useState<
    unknown | undefined
  >(undefined);
  const [totalResultResponse, setTotalResultResponse] = useState<
    ITotalResult | undefined
  >(undefined);
  const [totalResultError, setTotalResultError] = useState<unknown | undefined>(
    undefined
  );
  const { result } = useResult();
  const { session } = useSession();

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
      }
    } catch (error) {
      setSpecificResultError(error);
    }
  };

  const handleClickGetTotalResults = async (
    userId: string | null | undefined
  ) => {
    try {
      const response = await axios.get("/api/results/total", {
        params: { userId },
      });
      if (response.data) {
        setTotalResultResponse(response.data);
        console.log(response.data);
      }
    } catch (error) {
      setTotalResultError(error);
    }
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Results from your current session
        </AccordionSummary>
        <AccordionDetails>
          {result.attempts !== 0 ? (
            <Box>
              <Typography>
                Hi, this are your current session results:
              </Typography>
              <Stack direction="row" spacing={1}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Category
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`${result.category}`}
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Difficulty
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`${result.difficulty}`}
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Type
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`${result.type}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Stack>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: [
                      "Attempts",
                      "Successful Attempts",
                      "Failed Attempts",
                    ],
                  },
                ]}
                series={[
                  {
                    data: [
                      result.attempts,
                      result.successfulAttempts,
                      result.failedAttempts,
                    ],
                  },
                ]}
                width={500}
                height={300}
              />
            </Box>
          ) : (
            <Typography>No results yet.</Typography>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Results for a specific category, difficulty and type from server
        </AccordionSummary>
        <AccordionDetails>
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
              disabled={session ? false : true}
              sx={{ my: 1 }}
            >
              Save
            </Button>
          </Box>
          {specificResultResponse ? (
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Attempts", "Successful Attempts", "Failed Attempts"],
                },
              ]}
              series={[
                {
                  data: [
                    specificResultResponse.attempts,
                    specificResultResponse.successfulAttempts,
                    specificResultResponse.failedAttempts,
                  ],
                },
              ]}
              width={500}
              height={300}
            />
          ) : specificResultError ? (
            <Card raised sx={{ p: 2 }}>
              There are no results for this user in this category, difficulty
              and type!
            </Card>
          ) : (
            <></>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Total results
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" justifyContent="right">
            <Button
              variant="contained"
              onClick={() => handleClickGetTotalResults(session?.user?.id)}
              disabled={session ? false : true}
              sx={{ my: 1 }}
            >
              Save
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
