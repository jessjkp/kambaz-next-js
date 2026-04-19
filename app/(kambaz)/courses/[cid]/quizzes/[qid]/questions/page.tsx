/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import * as client from "../../client";

export default function QuizQuestionsPage() {
  const { cid, qid } = useParams();

  const courseId = cid as string;
  const quizId = qid as string;
  const router = useRouter();

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const [questions, setQuestions] = useState<any[]>([]);

  const fetchQuestions = async () => {
    const data = await client.findQuestionsForQuiz(quizId);
    setQuestions(data);
  };

  const addQuestion = async () => {
    await client.createQuestion({
      quiz: quizId,
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 0,
      question: "",
      choices: ["", ""],
      correctAnswer: 0,
      possibleAnswers: [],
    });
    await fetchQuestions();
  };

  const removeQuestion = async (questionId: string) => {
    await client.deleteQuestion(questionId);
    await fetchQuestions();
  };

  useEffect(() => {
    if (currentUser && !isFaculty) {
      router.push(`/courses/${courseId}/quizzes/${quizId}`);
      return;
    }
    if (isFaculty) {
      fetchQuestions();
    }
  }, [quizId, currentUser]);

  if (currentUser && !isFaculty) {
    return <div className="p-3">Students cannot edit quiz questions.</div>;
  }

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Questions</h2>
        <button className="btn btn-danger" onClick={addQuestion}>
          + New Question
        </button>
      </div>

      <div className="mb-3">
        <Link
          href={`/courses/${courseId}/quizzes/${quizId}`}
          className="btn btn-secondary btn-sm"
        >
          Back to Quiz Details
        </Link>
      </div>

      {questions.length === 0 && (
        <div className="alert alert-light border">
          No questions yet. Click <b>+ New Question</b> to add one.
        </div>
      )}

      <ul className="list-group">
        {questions.map((question) => (
          <li
            key={question._id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <div className="fw-bold">{question.title}</div>
              <div className="text-muted small">Type: {question.type}</div>
              <div className="text-muted small">Points: {question.points}</div>
            </div>

            <div className="d-flex gap-2">
              <Link
                href={`/courses/${courseId}/quizzes/${quizId}/questions/${question._id}/edit`}
                className="btn btn-outline-primary btn-sm"
              >
                Edit
              </Link>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeQuestion(question._id)}
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