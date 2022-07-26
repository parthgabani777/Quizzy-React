import React from "react";

function QuizQuestion({ question, nextQuestionHandler }: any) {
    const { question: questionText, Options } = question;
    return (
        <>
            <div className="question-text">
                <span className="question-number-text">Question: </span>
                <span>{questionText}</span>
            </div>

            <div className="options-group">
                {Options.map((option : any, optionIndex: any) => {
                    return (
                        <p
                            className="option"
                            key={option}
                            onClick={() => nextQuestionHandler(optionIndex)}
                        >
                            {option}
                        </p>
                    );
                })}
            </div>
        </>
    );
}

export { QuizQuestion };
