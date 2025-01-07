import { Category } from "../enums/Category";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";

export interface ISettings {
    category: Category;
    difficulty: Difficulty;
    type: Type;
}