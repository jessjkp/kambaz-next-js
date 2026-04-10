/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const courseId = cid as string;
  const quizId = qid as string;

  const [quiz, setQuiz] = useState<any>(null);

  const fetchQuiz = async () => {
    const data = await client.findQuizById(quizId);
    setQuiz(data);
  };

  const saveQuiz = async () => {
    await client.updateQuiz(quiz);
    router.push(`/courses/${courseId}/quizzes/${quizId}/editing`);
  };

  const saveAndPublish = async () => {
    await client.updateQuiz(quiz);
    await client.publishQuiz(quizId);
    router.push(`/courses/${courseId}/quizzes`);
  };

  const cancel = () => {
    router.push(`/courses/${courseId}/quizzes`);
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="p-3" style={{ maxWidth: "700px" }}>
      <h2>Edit Quiz</h2>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={quiz.description || ""}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Quiz Type</label>
        <select
          className="form-select"
          value={quiz.quizType}
          onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
        >
          <option value="GRADED_QUIZ">Graded Quiz</option>
          <option value="PRACTICE_QUIZ">Practice Quiz</option>
          <option value="GRADED_SURVEY">Graded Survey</option>
          <option value="UNGRADED_SURVEY">Ungraded Survey</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Time Limit (minutes)</label>
        <input
          type="number"
          className="form-control"
          value={quiz.timeLimit}
          onChange={(e) =>
            setQuiz({ ...quiz, timeLimit: Number(e.target.value) })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Multiple Attempts</label>
        <select
          className="form-select"
          value={quiz.multipleAttempts ? "yes" : "no"}
          onChange={(e) =>
            setQuiz({
              ...quiz,
              multipleAttempts: e.target.value === "yes",
            })
          }
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {quiz.multipleAttempts && (
        <div className="mb-3">
          <label className="form-label">How Many Attempts</label>
          <input
            type="number"
            className="form-control"
            value={quiz.howManyAttempts}
            onChange={(e) =>
              setQuiz({
                ...quiz,
                howManyAttempts: Number(e.target.value),
              })
            }
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="datetime-local"
          className="form-control"
          value={quiz.dueDate ? quiz.dueDate.substring(0, 16) : ""}
          onChange={(e) =>
            setQuiz({ ...quiz, dueDate: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Available Date</label>
        <input
          type="datetime-local"
          className="form-control"
          value={quiz.availableDate ? quiz.availableDate.substring(0, 16) : ""}
          onChange={(e) =>
            setQuiz({ ...quiz, availableDate: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Until Date</label>
        <input
          type="datetime-local"
          className="form-control"
          value={quiz.untilDate ? quiz.untilDate.substring(0, 16) : ""}
          onChange={(e) =>
            setQuiz({ ...quiz, untilDate: e.target.value })
          }
        />
      </div>

      <div className="d-flex gap-2 mt-4">
        <button className="btn btn-secondary" onClick={cancel}>
          Cancel
        </button>

        <button className="btn btn-primary" onClick={saveQuiz}>
          Save
        </button>

        <button className="btn btn-success" onClick={saveAndPublish}>
          Save & Publish
        </button>
      </div>
    </div>
  );
}