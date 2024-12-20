import {
  Accordion,
  AccordionSummary,
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
import { Category } from "../enums/Category";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { IQuestion } from "../interfaces/IQuestion";
import { SettingsKey } from "../pages/Play";

export default function QuizSettings(props: {
  setQuestions: Dispatch<SetStateAction<IQuestion[]>>;
  settings: { type: Type; category: Category; difficulty: Difficulty };
  setSettings: Dispatch<
    SetStateAction<{
      type: Type;
      category: Category;
      difficulty: Difficulty;
    }>
  >;
}) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const updateSettings = <T extends string | number>(
    key: SettingsKey,
    value: T,
    enumType: { [key: string]: T }
  ) => {
    if (Object.values(enumType).includes(value)) {
      props.setSettings((oldValues) => ({
        ...oldValues,
        [key]: value,
      }));
    }
  };

  const handleChangeCategory = (event: SelectChangeEvent<Category>) => {
    updateSettings("category", event.target.value, Category);
  };

  const handleChangeDifficulty = (event: SelectChangeEvent<Difficulty>) => {
    updateSettings("difficulty", event.target.value, Difficulty);
  };

  const handleChangeType = (event: SelectChangeEvent<Type>) => {
    updateSettings("type", event.target.value, Type);
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

  const handleClickSave = async () => {
    try {
      const response = await axios.get(
        `api/questions?category=${props.settings.category}&type=${props.settings.type}&difficulty=${props.settings.difficulty}`
      );
      const shuffledArray: IQuestion[] = shuffleArray(response.data);
      props.setQuestions(shuffledArray);
      setExpanded(false);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  return (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        Choose your settings
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={2}>
          <FormControl variant="filled" fullWidth sx={{ m: 1 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={props.settings.category}
              onChange={handleChangeCategory}
            >
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
              value={props.settings.difficulty}
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
            <Select value={props.settings.type} onChange={handleChangeType}>
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
