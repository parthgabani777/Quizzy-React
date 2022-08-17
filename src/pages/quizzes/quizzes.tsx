import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./quizzes.css";
import { getQuizzes } from "../../services/quiz-services";
import { useLoader } from "../../context/loader-context";
import { LoaderContextType } from "types/loader.context.types";
import { QuizType } from "types/quiz.types";

function Quizzes() {
    const [quizzes, setQuizzes] = useState<QuizType[]>([]);
    const { categoryId } = useParams();
    const { loading, setLoading } = useLoader() as LoaderContextType;

    useEffect(() => {
        const getData = async () => {
            if (categoryId) {
                setLoading(true);
                const quizzes = await getQuizzes(categoryId);
                setLoading(false);
                setQuizzes(quizzes);
            }
        };
        getData();
    }, [categoryId, setLoading]);

    return (
        <>
            <p className="category-title">Select the Quiz</p>

            <div className="card-grid">
                {quizzes.length > 0
                    ? quizzes.map(({ id, title, imageUrl, totalQuestions }) => (
                          <Link to={`/rules/${id}`} className="card" key={id}>
                              <img
                                  src={imageUrl}
                                  alt={title}
                                  className="card-img"
                              />
                              <div className="card-content">
                                  <p className="card-title">{title}</p>
                                  <p className="card-text">
                                      {totalQuestions} Questions
                                  </p>
                              </div>
                          </Link>
                      ))
                    : loading || (
                          <h1 className="text-center">
                              There is no quiz available in this category
                          </h1>
                      )}
            </div>
        </>
    );
}

export { Quizzes };
