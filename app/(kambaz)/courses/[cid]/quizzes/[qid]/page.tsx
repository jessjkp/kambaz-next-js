/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import * as client from "../client";

export default function QuizDetailsPage() {
  const { cid, qid } = useParams();

  const courseId = cid as string;
  const quizId = qid as string;

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";
  const studentId = currentUser?._id;

  const [quiz, setQuiz] = useState<any>(null);
  const [attempts, setAttempts] = useState<any[]>([]);

  const loadData = async () => {
    const quizData = await client.findQuizById(quizId);
    setQuiz(quizData);

    if (!isFaculty && studentId) {
      const attemptsData = await client.findAttemptsForStudentInQuiz(
        quizId,
        studentId
      );
      setAttempts(attemptsData);
    } else {
      setAttempts([]);
    }
  };

  useEffect(() => {
    loadData();
  }, [quizId, studentId, isFaculty]);

  if (!quiz) return <div className="p-3">Loading...</div>;

  const maxAttempts = quiz.multipleAttempts ? quiz.howManyAttempts : 1;
  const attemptsUsed = attempts.length;
  const attemptsRemaining = maxAttempts - attemptsUsed;
  const canTakeQuiz = attemptsRemaining > 0;
  const latestAttempt = attempts.length > 0 ? attempts[0] : null;

  return (
    <div className="p-3" style={{ maxWidth: "850px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        <div className="d-flex gap-2 flex-wrap">
          {isFaculty && (
            <>
              <Link
                href={`/courses/${courseId}/quizzes/${quizId}/edit`}
                className="btn btn-primary"
              >
                Edit
              </Link>

              <Link
                href={`/courses/${courseId}/quizzes/${quizId}/questions`}
                className="btn btn-warning"
              >
                Questions
              </Link>
            </>
          )}

          {!isFaculty && studentId && canTakeQuiz ? (
            <Link
              href={`/courses/${courseId}/quizzes/${quizId}/take`}
              className="btn btn-success"
            >
              Start Quiz
            </Link>
          ) : !isFaculty && studentId ? (
            <button className="btn btn-secondary" disabled>
              No Attempts Remaining
            </button>
          ) : null}

          {!isFaculty && studentId && (
            <Link
              href={`/courses/${courseId}/quizzes/${quizId}/results`}
              className="btn btn-info"
            >
              View Results
            </Link>
          )}

          <Link
            href={`/courses/${courseId}/quizzes`}
            className="btn btn-secondary"
          >
            Back to Quizzes
          </Link>
        </div>
      </div>

      <div className="card p-3">
        <div className="mb-3">
          <h5>Description</h5>
          <div>{quiz.description || "No description"}</div>
        </div>

        <hr />

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Status</div>
          <div className="col-md-8">
            {quiz.published ? "Published" : "Unpublished"}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Quiz Type</div>
          <div className="col-md-8">
            {quiz.quizType === "GRADED_QUIZ" && "Graded Quiz"}
            {quiz.quizType === "PRACTICE_QUIZ" && "Practice Quiz"}
            {quiz.quizType === "GRADED_SURVEY" && "Graded Survey"}
            {quiz.quizType === "UNGRADED_SURVEY" && "Ungraded Survey"}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Assignment Group</div>
          <div className="col-md-8">{quiz.assignmentGroup}</div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Shuffle Answers</div>
          <div className="col-md-8">{quiz.shuffleAnswers ? "Yes" : "No"}</div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Time Limit</div>
          <div className="col-md-8">{quiz.timeLimit} minutes</div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Multiple Attempts</div>
          <div className="col-md-8">
            {quiz.multipleAttempts
              ? `Yes (${quiz.howManyAttempts} attempts)`
              : "No"}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Show Correct Answers</div>
          <div className="col-md-8">
            {quiz.showCorrectAnswers || "Not configured"}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Access Code</div>
          <div className="col-md-8">{quiz.accessCode || "None"}</div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">One Question at a Time</div>
          <div className="col-md-8">
            {quiz.oneQuestionAtATime ? "Yes" : "No"}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Webcam Required</div>
          <div className="col-md-8">
            {quiz.webcamRequired ? "Yes" : "No"}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Lock Questions After Answering</div>
          <div className="col-md-8">
            {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
          </div>
        </div>

        <hr />

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Due Date</div>
          <div className="col-md-8">
            {quiz.dueDate
              ? new Date(quiz.dueDate).toLocaleString()
              : "Not set"}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Available Date</div>
          <div className="col-md-8">
            {quiz.availableDate
              ? new Date(quiz.availableDate).toLocaleString()
              : "Not set"}
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-md-4 fw-bold">Until Date</div>
          <div className="col-md-8">
            {quiz.untilDate
              ? new Date(quiz.untilDate).toLocaleString()
              : "Not set"}
          </div>
        </div>

        {!isFaculty && studentId && (
          <>
            <hr />

            <div className="row mb-2">
              <div className="col-md-4 fw-bold">Attempts Used</div>
              <div className="col-md-8">
                {attemptsUsed} / {maxAttempts}
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-md-4 fw-bold">Attempts Remaining</div>
              <div className="col-md-8">
                {Math.max(attemptsRemaining, 0)}
              </div>
            </div>

            {latestAttempt && (
              <>
                <div className="row mb-2">
                  <div className="col-md-4 fw-bold">Last Score</div>
                  <div className="col-md-8">{latestAttempt.score}</div>
                </div>

                <div className="row mb-2">
                  <div className="col-md-4 fw-bold">Last Submitted</div>
                  <div className="col-md-8">
                    {latestAttempt.submittedAt
                      ? new Date(latestAttempt.submittedAt).toLocaleString()
                      : "Unknown"}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}