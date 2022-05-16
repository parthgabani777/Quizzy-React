function QuizQuestion({ question, nextQuestionHandler }) {
    const { question: questionText, Options } = question;
    return (
        <>
            <div className="question-text">
                <span className="question-number-text">Question: </span>
                <span>{questionText}</span>
            </div>

            <div className="options-group">
                {Options.map((option, optionIndex) => {
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
