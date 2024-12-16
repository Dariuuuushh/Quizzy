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
import { Dispatch, SetStateAction } from "react";
import { Category } from "../enums/Category";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { IQuestion } from "../interfaces/IQuestion";

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
  const handleChangeCategory = (event: SelectChangeEvent<Category>) => {
    const value = event.target.value;

    if (Object.values(Category).includes(value as Category)) {
      props.setSettings((oldValues) => {
        return { ...oldValues, category: value as Category };
      });
    }
  };

  const handleChangeDifficulty = (event: SelectChangeEvent<Difficulty>) => {
    const value = event.target.value;

    if (Object.values(Difficulty).includes(value as Difficulty)) {
      props.setSettings((oldValues) => {
        return { ...oldValues, difficulty: value as Difficulty };
      });
    }
  };

  const handleChangeType = (event: SelectChangeEvent<Type>) => {
    const value = event.target.value;

    if (Object.values(Type).includes(value as Type)) {
      props.setSettings((oldValues) => {
        return { ...oldValues, type: value as Type };
      });
    }
  };

  const handleClickSave = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5268/api/questions?category=${props.settings.category}&type=${props.settings.type}&difficulty=${props.settings.difficulty}`
      );
      console.log("Response", response.data);
      props.setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  return (
    <Accordion>
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
