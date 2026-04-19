/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import * as client from "../../client";

export default function QuizResultsPage() {
  const { cid, qid } = useParams();

  const courseId = cid as string;
  const quizId = qid as string;

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  const studentId = currentUser?._id;

  const [attempt, setAttempt] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const loadData = async () => {
    if (!studentId || isFaculty) return;

    const latestAttempt =
      await client.findLatestAttemptForStudentInQuiz(quizId, studentId);
    const questionsData = await client.findQuestionsForQuiz(quizId);

    setAttempt(latestAttempt);
    setQuestions(questionsData);
  };

  useEffect(() => {
    loadData();
  }, [quizId, studentId, isFaculty]);

  if (!studentId) {
    return <div className="p-3">Please log in to view quiz results.</div>;
  }

  if (isFaculty) {
    return <div className="p-3">Faculty preview results should be handled separately.</div>;
  }

  if (!attempt) return <div className="p-3">No attempts yet</div>;

  return (
    <div className="p-3" style={{ maxWidth: "800px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quiz Results</h2>
        <div className="d-flex gap-2">
          <Link
            href={`/courses/${courseId}/quizzes/${quizId}`}
            className="btn btn-secondary"
          >
            Back to Quiz
          </Link>
        </div>
      </div>

      <div className="alert alert-info">
        Score: <strong>{attempt.score}</strong>
      </div>

      {questions.map((q) => {
        const studentAnswer = attempt.answers?.[q._id];

        let isCorrect = false;

        if (q.type === "MULTIPLE_CHOICE") {
          isCorrect = studentAnswer === q.correctAnswer;
        } else if (q.type === "TRUE_FALSE") {
          isCorrect = studentAnswer === q.correctAnswer;
        } else if (q.type === "FILL_IN_BLANK") {
          isCorrect = (q.possibleAnswers || [])
            .map((a: string) => a.toLowerCase().trim())
            .includes(String(studentAnswer || "").toLowerCase().trim());
        }

        return (
          <div
            key={q._id}
            className={`mb-4 p-3 border rounded ${
              isCorrect ? "border-success" : "border-danger"
            }`}
          >
            <h5>{q.question}</h5>

            <div>
              Your Answer:{" "}
              <strong>
                {q.type === "MULTIPLE_CHOICE"
                  ? q.choices?.[studentAnswer] ?? "No answer"
                  : String(studentAnswer ?? "No answer")}
              </strong>
            </div>

            {!isCorrect && (
              <div className="text-danger">
                Correct Answer:{" "}
                {q.type === "MULTIPLE_CHOICE"
                  ? q.choices?.[q.correctAnswer]
                  : q.type === "TRUE_FALSE"
                  ? String(q.correctAnswer)
                  : q.possibleAnswers?.join(", ")}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}