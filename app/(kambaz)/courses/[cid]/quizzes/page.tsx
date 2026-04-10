/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import * as client from "../quizzes/client";

export default function quizzes() {
  const { cid } = useParams();
  const courseId = cid as string;
  const router = useRouter();
  
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(courseId);
    setQuizzes(quizzes);
  };

  const addQuiz = async () => {
    const newQuiz = await client.createQuiz({
      course: courseId,
      title: "New Quiz",
    });
    router.push(`/courses/${courseId}/quizzes/${newQuiz._id}/editing`);
  };

  const removeQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    await fetchQuizzes();
  };

  const togglePublish = async (quiz: any) => {
    if (quiz.published) {
      await client.unpublishQuiz(quiz._id);
    } else {
      await client.publishQuiz(quiz._id);
    }
    await fetchQuizzes();
  };

  useEffect(() => {
    fetchQuizzes();
  }, [courseId]);

  return (
    <div id="wd-quizzes-screen" className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quizzes</h2>
        <button className="btn btn-danger" onClick={addQuiz}>
          + Quiz
        </button>
      </div>

      {quizzes.length === 0 && (
        <div className="alert alert-light border">
          No quizzes yet. Click <b>+ Quiz</b> to create one.
        </div>
      )}

      <ul className="list-group">
        {quizzes.map((quiz) => (
          <li
            key={quiz._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <div className="d-flex align-items-center gap-2">
                <button
                  className={`btn btn-sm ${quiz.published ? "btn-success" : "btn-secondary"}`}
                  onClick={() => togglePublish(quiz)}
                >
                  {quiz.published ? "Published" : "Unpublished"}
                </button>

                <Link
                  href={`/courses/${courseId}/quizzes/${quiz._id}`}
                  className="fw-bold text-decoration-none"
                >
                  {quiz.title}
                </Link>
              </div>

              <div className="text-muted small mt-2">
                Due: {quiz.dueDate ? new Date(quiz.dueDate).toLocaleString() : "No due date"}
              </div>
              <div className="text-muted small">
                Available:{" "}
                {quiz.availableDate
                  ? new Date(quiz.availableDate).toLocaleString()
                  : "Not set"}
              </div>
              <div className="text-muted small">
                Until: {quiz.untilDate ? new Date(quiz.untilDate).toLocaleString() : "Not set"}
              </div>
            </div>

            <div className="d-flex gap-2">
              <Link
                href={`/courses/${courseId}/quizzes/${quiz._id}/editing`}
                className="btn btn-outline-primary btn-sm"
              >
                Edit
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeQuiz(quiz._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}