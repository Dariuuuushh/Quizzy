import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";
import { Dispatch, SetStateAction, useState } from "react";
import { IQuestion } from "../interfaces/IQuestion";
import { SettingsKey } from "../pages/Play";
import axios from "axios";

export default function TournamentSettings(props: {
  setQuestions: Dispatch<SetStateAction<IQuestion[]>>;
}) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [tournamentSettings, setTournamentSettings] = useState({
    difficulty: Difficulty.easy,
    type: Type.multiple,
  });

  const updateSettings = <T extends string | number>(
    key: SettingsKey,
    value: T,
    enumType: { [key: string]: T }
  ) => {
    if (Object.values(enumType).includes(value)) {
      setTournamentSettings((oldValues) => ({
        ...oldValues,
        [key]: value,
      }));
    }
  };

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

  const handleChangeDifficulty = (event: SelectChangeEvent<Difficulty>) => {
    updateSettings("difficulty", event.target.value, Difficulty);
  };

  const handleChangeType = (event: SelectChangeEvent<Type>) => {
    updateSettings("type", event.target.value, Type);
  };

  const handleClickSave = async () => {
    getQuestions();
  };

  const getQuestions = async () => {
    try {
      const response = await axios.get(`api/tournaments`, {
        params: {
          type: tournamentSettings.type,
          difficulty: tournamentSettings.difficulty,
        },
      });
      const shuffledArray: IQuestion[] = shuffleArray(response.data);
      props.setQuestions(shuffledArray);
      setExpanded(false);
    } catch (error) {
      props.setQuestions([]);
      setExpanded(true);
    }
  };

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Choose your settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={2}>
          <FormControl variant="filled" fullWidth sx={{ m: 1 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={tournamentSettings.difficulty}
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
            <Select value={tournamentSettings.type} onChange={handleChangeType}>
              {Object.values(Type).map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Box display="flex" justifyContent="right">
          <Button variant="contained" onClick={handleClickSave} sx={{ my: 1 }}>
            Save
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
