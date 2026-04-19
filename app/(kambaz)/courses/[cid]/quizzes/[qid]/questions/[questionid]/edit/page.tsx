/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import * as client from "../../../../client";

export default function QuestionEditorPage() {
  const { cid, qid, questionid } = useParams();
  const router = useRouter();

  const courseId = cid as string;
  const quizId = qid as string;
  const qstId = questionid as string;

  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const isFaculty = currentUser?.role === "FACULTY";

  const [question, setQuestion] = useState<any>(null);

  const fetchQuestion = async () => {
    const data = await client.findQuestionById(qstId);
    setQuestion(data);
  };

  useEffect(() => {
    if (!currentUser) return;
    if (!qstId) return;

    if (!isFaculty) {
      router.push(`/courses/${courseId}/quizzes/${quizId}`);
      return;
    }

    fetchQuestion();
  }, [qstId, currentUser]);

  if (!currentUser || !qstId) return <div className="p-3">Loading...</div>;
  if (!isFaculty) return <div className="p-3">Students cannot edit quiz questions.</div>;
  if (!question) return <div className="p-3">Loading question...</div>;

  const updateField = (field: string, value: any) => {
    setQuestion({ ...question, [field]: value });
  };

  const updateChoice = (index: number, value: string) => {
    const newChoices = [...(question.choices || [])];
    newChoices[index] = value;
    setQuestion({ ...question, choices: newChoices });
  };

  const addChoice = () => {
    setQuestion({
      ...question,
      choices: [...(question.choices || []), ""],
    });
  };

  const removeChoice = (index: number) => {
    const newChoices = [...(question.choices || [])];
    newChoices.splice(index, 1);
    setQuestion({ ...question, choices: newChoices });
  };

  const updatePossibleAnswer = (index: number, value: string) => {
    const newAnswers = [...(question.possibleAnswers || [])];
    newAnswers[index] = value;
    setQuestion({ ...question, possibleAnswers: newAnswers });
  };

  const addPossibleAnswer = () => {
    setQuestion({
      ...question,
      possibleAnswers: [...(question.possibleAnswers || []), ""],
    });
  };

  const removePossibleAnswer = (index: number) => {
    const newAnswers = [...(question.possibleAnswers || [])];
    newAnswers.splice(index, 1);
    setQuestion({ ...question, possibleAnswers: newAnswers });
  };

  const saveQuestion = async () => {
    await client.updateQuestion(question);
    router.push(`/courses/${courseId}/quizzes/${quizId}/questions`);
  };

  const cancel = () => {
    router.push(`/courses/${courseId}/quizzes/${quizId}/questions`);
  };

  return (
    <div className="p-3" style={{ maxWidth: "850px" }}>
      <h2>Edit Question</h2>

      <div className="mb-3">
        <label className="form-label">Question Type</label>
        <select
          className="form-select"
          value={question.type}
          onChange={(e) => updateField("type", e.target.value)}
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True / False</option>
          <option value="FILL_IN_BLANK">Fill in the Blank</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={question.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Points</label>
        <input
          type="number"
          className="form-control"
          value={question.points ?? 0}
          onChange={(e) => updateField("points", Number(e.target.value))}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Question</label>
        <textarea
          className="form-control"
          rows={4}
          value={question.question || ""}
          onChange={(e) => updateField("question", e.target.value)}
        />
      </div>

      {question.type === "MULTIPLE_CHOICE" && (
        <div className="mb-4">
          <label className="form-label">Choices</label>
          {(question.choices || []).map((choice: string, index: number) => (
            <div key={index} className="d-flex gap-2 mb-2 align-items-center">
              <input
                type="radio"
                checked={question.correctAnswer === index}
                onChange={() => updateField("correctAnswer", index)}
              />
              <input
                className="form-control"
                value={choice}
                onChange={(e) => updateChoice(index, e.target.value)}
              />
              <button
                className="btn btn-outline-danger"
                onClick={() => removeChoice(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button className="btn btn-outline-secondary btn-sm" onClick={addChoice}>
            Add Choice
          </button>
        </div>
      )}

      {question.type === "TRUE_FALSE" && (
        <div className="mb-4">
          <label className="form-label d-block">Correct Answer</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              checked={question.correctAnswer === true}
              onChange={() => updateField("correctAnswer", true)}
            />
            <label className="form-check-label">True</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              checked={question.correctAnswer === false}
              onChange={() => updateField("correctAnswer", false)}
            />
            <label className="form-check-label">False</label>
          </div>
        </div>
      )}

      {question.type === "FILL_IN_BLANK" && (
        <div className="mb-4">
          <label className="form-label">Accepted Answers</label>
          {(question.possibleAnswers || []).map((answer: string, index: number) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input
                className="form-control"
                value={answer}
                onChange={(e) => updatePossibleAnswer(index, e.target.value)}
              />
              <button
                className="btn btn-outline-danger"
                onClick={() => removePossibleAnswer(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={addPossibleAnswer}
          >
            Add Accepted Answer
          </button>
        </div>
      )}

      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={cancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={saveQuestion}>
          Save Question
        </button>
      </div>
    </div>
  );
}