/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import * as client from "../../client";

export default function TakeQuizPage() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const courseId = cid as string;
  const quizId = qid as string;

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  const studentId = currentUser?._id;

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [attempts, setAttempts] = useState<any[]>([]);

  const loadData = async () => {
    if (!studentId || isFaculty) return;

    const quizData = await client.findQuizById(quizId);
    const questionsData = await client.findQuestionsForQuiz(quizId);
    const attemptsData = await client.findAttemptsForStudentInQuiz(
      quizId,
      studentId
    );

    setQuiz(quizData);
    setQuestions(questionsData);
    setAttempts(attemptsData);
  };

  useEffect(() => {
    loadData();
  }, [quizId, studentId, isFaculty]);

  const updateAnswer = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  if (!studentId) {
    return <div className="p-3">Please log in to take this quiz.</div>;
  }

  if (isFaculty) {
    return <div className="p-3">Faculty should use preview instead of student quiz-taking.</div>;
  }

  if (!quiz) return <div className="p-3">Loading...</div>;

  const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const attemptsUsed = attempts.length;
  const attemptsRemaining = maxAttempts - attemptsUsed;
  const noAttemptsRemaining = attemptsRemaining <= 0;

  const submitQuiz = async () => {
    if (noAttemptsRemaining) return;

    await client.submitQuizAttempt(quizId, {
      student: studentId,
      answers,
    });

    router.push(`/courses/${courseId}/quizzes/${quizId}/results`);
  };

  return (
    <div className="p-3" style={{ maxWidth: "800px" }}>
      <h2>{quiz.title}</h2>

      <div className="mb-3">
        <div className="alert alert-secondary">
          Attempts Used: <strong>{attemptsUsed}</strong> / {maxAttempts}
          <br />
          Attempts Remaining: <strong>{Math.max(attemptsRemaining, 0)}</strong>
        </div>
      </div>

      {noAttemptsRemaining ? (
        <div className="alert alert-danger">
          You have used all allowed attempts for this quiz.
        </div>
      ) : (
        <>
          {questions.map((q) => (
            <div key={q._id} className="mb-4 border p-3 rounded">
              <h5>{q.question}</h5>

              {q.type === "MULTIPLE_CHOICE" &&
                q.choices.map((choice: string, index: number) => (
                  <div key={index} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={q._id}
                      checked={answers[q._id] === index}
                      onChange={() => updateAnswer(q._id, index)}
                    />
                    <label className="form-check-label">{choice}</label>
                  </div>
                ))}

              {q.type === "TRUE_FALSE" && (
                <>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={q._id}
                      checked={answers[q._id] === true}
                      onChange={() => updateAnswer(q._id, true)}
                    />
                    <label className="form-check-label">True</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={q._id}
                      checked={answers[q._id] === false}
                      onChange={() => updateAnswer(q._id, false)}
                    />
                    <label className="form-check-label">False</label>
                  </div>
                </>
              )}

              {q.type === "FILL_IN_BLANK" && (
                <input
                  className="form-control"
                  value={answers[q._id] || ""}
                  onChange={(e) => updateAnswer(q._id, e.target.value)}
                />
              )}
            </div>
          ))}

          <button className="btn btn-success" onClick={submitQuiz}>
            Submit Quiz
          </button>
        </>
      )}
    </div>
  );
}