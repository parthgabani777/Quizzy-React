import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLoader } from "../../context/loader-context";
import { getQuiz } from "../../services/quiz-services";
import "./rules.css";

function Rules() {
    const { quizId } = useParams();
    const { loading, setLoading }: any = useLoader();
    const [quiz, setQuiz] = useState();
    const { id, title, totalQuestions, totalTime }: any = quiz || {};

    useEffect(() => {
        const getQuizData = async () => {
            setLoading(true);
            const quiz = await getQuiz(quizId);
            setLoading(false);
            setQuiz(quiz);
        };

        getQuizData();
    }, [quizId, setLoading]);

    return (
        <div className="rule">
            {quiz ? (
                <>
                    <div className="quiz-title">{title}</div>
                    <div className="rule-title">Rules: -</div>
                    <div className="rule-list">
                        <p>
                            <span>1.</span> Quiz contains {totalQuestions}{" "}
                            questions.
                        </p>
                        <p>
                            <span>2.</span> Complete quiz in {totalTime}{" "}
                            minutes.
                        </p>
                        <p>
                            <span>4.</span> Correct answer displayed by green
                            color and wrong answer by red color.
                        </p>
                        <Link to={`/quiz/${id}`} className="btn quiz-start-btn">
                            Start Quiz
                        </Link>
                    </div>
                </>
            ) : (
                loading || <p className="text-m">Please enter right quiz id</p>
            )}
        </div>
    );
}

export { Rules };
