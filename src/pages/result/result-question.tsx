import React from "react";

function ResultQuestion({ state, index }: any) {
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
                {Options.map((option: any, optionIndex: any) => {
                    let classname: any = "";

                    classname = optionIndex == answer && "correct";

                    if (selectedAnswer == optionIndex) {
                        classname =
                            selectedAnswer == answer ? "correct" : "incorrect";
                    }

                    return (
                        <p className={`option ${classname}`} key={option}>
                            {option}
                        </p>
                    );
                })}
            </div>
        </div>
    );
}

export { ResultQuestion };
