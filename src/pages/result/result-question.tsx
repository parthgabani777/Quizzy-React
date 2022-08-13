import React from "react";
import { questionType } from "types/quiz.types";
import { ResultLocationStateType } from "./result";

type ResultQuestionPropsType = {
    state: ResultLocationStateType;
    index: number;
    question: questionType;
};

function ResultQuestion({ state, index }: ResultQuestionPropsType) {
    const { questions, answers } = state ?? {};
    const { selectedAnswers } = answers ?? {};

    const { question, answer, Options } = questions[index];

    const selectedAnswer = selectedAnswers[index];

    return (
        <div className="question-container">
            <div className="question-header">
                <p className="question-number">
                    <span className="question-number-text">Question:</span>
                    {`${index + 1}/${questions.length}`}
                </p>
            </div>

            <div className="question-text">
                <p>{question}</p>
            </div>

            <div className="options-group">
                {Options.map((option, optionIndex) => {
                    let className = "";

                    className += optionIndex === answer && "correct";

                    if (selectedAnswer === optionIndex) {
                        className =
                            selectedAnswer === answer ? "correct" : "incorrect";
                    }

                    return (
                        <p className={`option ${className}`} key={option}>
                            {option}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}

export { ResultQuestion };
