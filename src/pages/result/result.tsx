import "./result.css";
import "../../css/questions.css";
import { useLocation } from "react-router";
import React from "react";
import { ResultQuestion } from "./result-question";

const Result = () => {
    const { state } = useLocation();

    const { questions, answers }: any = state ?? {};
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
                        {questions.map((question: any, index: any) => (
                            <ResultQuestion
                                state={state}
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
