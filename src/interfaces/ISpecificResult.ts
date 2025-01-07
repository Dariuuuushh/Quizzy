import { Category } from "../enums/Category";
import { Difficulty } from "../enums/Difficulty";
import { Type } from "../enums/Type";

export interface ISpecificResult {
    type: Type,
    category: Category,
    difficulty: Difficulty,
    attempts: number,
    successfulAttempts: number,
    failedAttempts: number,
}