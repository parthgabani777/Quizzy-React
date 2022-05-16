import "./quiz.css";
import "../../css/questions.css";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useLoader } from "../../context/loader-context";
import { getQuestions } from "../../services/question-services";
import { saveResult } from "../../services/result-services";
import { QuizQuestion } from "./quiz-question";

function Quiz() {
    const { quizId } = useParams();
    const { loading, setLoading } = useLoader();
    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState();

    const [answers, setAnswers] = useState({
        currentQuestionCounter: 0,
        currentScore: 0,
        selectedAnswers: [],
    });

    const navigation = useNavigate();

    useEffect(() => {
        const getQuestionsData = async () => {
            setLoading(true);
            const { quiz, questions } = await getQuestions(quizId);
            setLoading(false);
            setQuiz(quiz);
            setQuestions(questions);
        };

        getQuestionsData();
    }, []);

    const getUpdatedAnswer = (selectedAnswer) => {
        const correctAnswer = questions[answers.currentQuestionCounter].answer;

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

    const EndQuiz = async (updatedAnswer) => {
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
    };

    const nextQuestionHandler = async (selectedAnswer) => {
        const updatedAnswer = getUpdatedAnswer(selectedAnswer);

        if (answers.currentQuestionCounter < questions.length - 1) {
            return setAnswers(updatedAnswer);
        }

        EndQuiz(updatedAnswer);
    };

    return (
        <section className="main">
            {questions.length > 0 && !loading ? (
                <>
                    <div className="quiz-title">{quiz.title}</div>

                    <div className="question-container">
                        <div className="question-header">
                            <p className="question-number">
                                <span className="question-number-text">
                                    Question Index:{" "}
                                </span>
                                {answers.currentQuestionCounter}/5
                            </p>
                            <p className="quiz-score">
                                <span className="quiz-score-text">
                                    Scrore:{" "}
                                </span>
                                {answers.currentScore}
                            </p>
                        </div>

                        <QuizQuestion
                            question={questions[answers.currentQuestionCounter]}
                            nextQuestionHandler={nextQuestionHandler}
                        />

                        {/* <div className="question-footer">
                            <Link to="/result" className="submit-btn">
                                End test
                            </Link>
                        </div> */}
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
