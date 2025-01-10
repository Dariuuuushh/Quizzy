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
  Typography,
} from "@mui/material";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";
import { Dispatch, SetStateAction, useState } from "react";
import { Category } from "../enums/Category";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { IQuestion } from "../interfaces/IQuestion";
import { SettingsKey } from "../pages/Play";
import { ISettings } from "../interfaces/ISettings";
import { useSession } from "../SessionWrapper/useSession";
import { useDialogs } from "@toolpad/core";
import { useResult } from "../ResultHook/useResult";

export default function QuizSettings(props: {
  setQuestions: Dispatch<SetStateAction<IQuestion[]>>;
}) {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { session, sessionSettings, setSessionSettings } = useSession();
  const dialogs = useDialogs();
  const { setResult } = useResult();
  const [localSettingsBeforeSave, setLocalSettingsBeforeSave] =
    useState<ISettings>({
      type: sessionSettings.type,
      category: sessionSettings.category,
      difficulty: sessionSettings.difficulty,
    });

  const updateSettings = <T extends string | number>(
    key: SettingsKey,
    value: T,
    enumType: { [key: string]: T }
  ) => {
    if (Object.values(enumType).includes(value)) {
      setLocalSettingsBeforeSave((oldValues) => ({
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
    if (isSaved && session?.user?.id) {
      const confirmed = await dialogs.confirm(
        "Are you sure you want to change your Settings before saving them?",
        {
          okText: "Yes",
          cancelText: "No",
          severity: "warning",
        }
      );
      if (confirmed) {
        setSessionSettings(localSettingsBeforeSave);
        getQuestions();
        setResult(() => {
          return {
            category: localSettingsBeforeSave.category,
            difficulty: localSettingsBeforeSave.difficulty,
            type: localSettingsBeforeSave.type,
            attempts: 0,
            successfulAttempts: 0,
            failedAttempts: 0,
          };
        });
      }
    } else {
      setSessionSettings(localSettingsBeforeSave);
      getQuestions();
      setResult(() => {
        return {
          category: localSettingsBeforeSave.category,
          difficulty: localSettingsBeforeSave.difficulty,
          type: localSettingsBeforeSave.type,
          attempts: 0,
          successfulAttempts: 0,
          failedAttempts: 0,
        };
      });
    }
  };

  const getQuestions = async () => {
    try {
      const response = await axios.get("api/questions", {
        params: {
          category: localSettingsBeforeSave.category,
          type: localSettingsBeforeSave.type,
          difficulty: localSettingsBeforeSave.difficulty,
        },
      });
      const shuffledArray: IQuestion[] = shuffleArray(response.data);
      props.setQuestions(shuffledArray);
      setIsSaved(true);
      setExpanded(false);
    } catch (error) {
      props.setQuestions([]);
      dialogs.alert(`No questions available for this settings!`);
      setExpanded(true);
    }
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded((prevExpanded) => !prevExpanded)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Choose your settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={2}>
          <FormControl variant="filled" fullWidth sx={{ m: 1 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={localSettingsBeforeSave.category}
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
              value={localSettingsBeforeSave.difficulty}
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
            <Select
              value={localSettingsBeforeSave.type}
              onChange={handleChangeType}
            >
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
            onClick={handleClickSave}
            sx={{ my: 1 }}
            disabled={sessionSettings === localSettingsBeforeSave}
          >
            Save
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
