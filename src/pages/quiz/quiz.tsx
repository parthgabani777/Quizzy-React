import "./quiz.css";
import "../../css/questions.css";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useLoader } from "../../context/loader-context";
import { getQuestions } from "../../services/question-services";
import { saveResult } from "../../services/result-services";
import { QuizQuestion } from "./quiz-question";
import { LoaderContextType } from "types/loader.context.types";
import { QuestionType, QuizType } from "types/quiz.types";
import { AnswersType, ResultType } from "types/result.types";

export const getUpdatedAnswer = (
    selectedAnswer: number,
    correctAnswer: number,
    answers: AnswersType
): AnswersType => {
    return selectedAnswer === correctAnswer
        ? {
              ...answers,
              currentQuestionCounter: answers.currentQuestionCounter + 1,
              currentScore: answers.currentScore + 1,
              selectedAnswers: [...answers.selectedAnswers, selectedAnswer],
          }
        : {
              ...answers,
              currentQuestionCounter: answers.currentQuestionCounter + 1,
              selectedAnswers: [...answers.selectedAnswers, selectedAnswer],
          };
};

function Quiz() {
    const { quizId } = useParams();
    const { loading, setLoading } = useLoader() as LoaderContextType;
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [quiz, setQuiz] = useState<QuizType>();

    const [answers, setAnswers] = useState<AnswersType>({
        currentQuestionCounter: 0,
        currentScore: 0,
        selectedAnswers: [],
    });

    const navigation = useNavigate();

    useEffect(() => {
        const getQuestionsData = async () => {
            if (quizId) {
                setLoading(true);
                const { quiz, questions } = await getQuestions(quizId);
                setLoading(false);
                setQuiz(quiz);
                setQuestions(questions);
            }
        };

        getQuestionsData();
    }, [quizId, setLoading]);

    const endQuiz = async (updatedAnswer: AnswersType) => {
        if (quizId && quiz) {
            setLoading(true);
            await saveResult({
                quizId: quizId,
                quizTitle: quiz.title,
                score: answers.currentScore,
                totalScore: quiz.totalQuestions,
            });
            setLoading(false);
            navigation("/result", {
                state: { questions, answers: updatedAnswer },
            });
        }
    };

    const nextQuestionHandler = async (selectedAnswer: number) => {
        const correctAnswer = questions[answers.currentQuestionCounter].answer;
        const updatedAnswer = getUpdatedAnswer(
            selectedAnswer,
            correctAnswer,
            answers
        );

        if (answers.currentQuestionCounter < questions.length - 1) {
            return setAnswers(updatedAnswer);
        }

        endQuiz(updatedAnswer);
    };

    return (
        <section className="main">
            {questions.length > 0 && !loading ? (
                <>
                    <div className="quiz-title">{quiz?.title}</div>

                    <div className="question-container">
                        <div className="question-header">
                            <p className="question-number">
                                <span className="question-number-text">
                                    Question Index:{" "}
                                </span>
                                {answers.currentQuestionCounter + 1}/
                                {questions.length}
                            </p>
                            <p className="quiz-score">
                                <span className="quiz-score-text">Score: </span>
                                {answers.currentScore}
                            </p>
                        </div>

                        <QuizQuestion
                            question={questions[answers.currentQuestionCounter]}
                            nextQuestionHandler={nextQuestionHandler}
                        />
                    </div>
                </>
            ) : (
                loading || (
                    <p className="text-m">
                        Either there is no questions in quiz or quiz-id provided
                        is wrong.
                    </p>
                )
            )}
        </section>
    );
}

export { Quiz };
