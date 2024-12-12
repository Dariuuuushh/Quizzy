import React from "react";
import questions from "../data/questions.json";

const Quiz: React.FC = () => {
  return (
    <div>
      <h1>Quiz</h1>
      {questions.map((question, index) => (
        <div key={question.id}>
          <h2>{`${index + 1}. ${question.text}`}</h2>
          <ul>
            {question.options.map((option, i) => (
              <li key={i}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
