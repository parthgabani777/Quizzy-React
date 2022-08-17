import "./result.css";
import "../../css/questions.css";
import { useLocation } from "react-router";
import React from "react";
import { ResultQuestion } from "./result-question";
import { QuestionType } from "types/quiz.types";
import { AnswersType } from "types/result.types";

export type ResultLocationStateType = {
    questions: QuestionType[];
    answers: AnswersType;
};

const Result = () => {
    const { state } = useLocation();

    const { questions, answers } = (state as ResultLocationStateType) ?? {};
    const { currentScore } = answers ?? {};

    return (
        <section className="result">
            <div className="result-title">
                <h2>Result</h2>
            </div>

            {state ? (
                <>
                    <div className="final-score">
                        Final Score: {currentScore} / {questions.length}
                    </div>
                    <div className="question-list">
                        {questions.map((question, index) => (
                            <ResultQuestion
                                state={state as ResultLocationStateType}
                                index={index}
                                question={question}
                                key={index}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-m py-2">Result is not available</p>
            )}
        </section>
    );
};

export { Result };
