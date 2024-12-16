export interface IQuestion {
    id: number;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    category: string;
    type: string;
    difficilty: string;
}