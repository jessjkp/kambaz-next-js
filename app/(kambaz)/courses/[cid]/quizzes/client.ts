/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;
export const QUESTIONS_API = `${HTTP_SERVER}/api/questions`;
export const STUDENTS_API = `${HTTP_SERVER}/api/students`;
export const ATTEMPTS_API = `${HTTP_SERVER}/api/attempts`;

export const createQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.post(QUIZZES_API, quiz);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/courses/${courseId}/quizzes`
  );
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const publishQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/publish`
  );
  return response.data;
};

export const unpublishQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/unpublish`
  );
  return response.data;
};

export const createQuestion = async (question: any) => {
  const response = await axiosWithCredentials.post(QUESTIONS_API, question);
  return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return response.data;
};

export const findQuestionById = async (questionId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUESTIONS_API}/${questionId}`
  );
  return response.data;
};

export const updateQuestion = async (question: any) => {
  const response = await axiosWithCredentials.put(
    `${QUESTIONS_API}/${question._id}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUESTIONS_API}/${questionId}`
  );
  return response.data;
};

export const submitQuizAttempt = async (
  quizId: string,
  attempt: {
    student: string;
    answers: Record<string, any>;
  }
) => {
  const response = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/attempts`,
    attempt
  );
  return response.data;
};

export const findAttemptsForQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts`
  );
  return response.data;
};

export const findAttemptsForStudent = async (studentId: string) => {
  const response = await axiosWithCredentials.get(
    `${STUDENTS_API}/${studentId}/attempts`
  );
  return response.data;
};

export const findAttemptsForStudentInQuiz = async (
  quizId: string,
  studentId: string
) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/students/${studentId}/attempts`
  );
  return response.data;
};

export const findLatestAttemptForStudentInQuiz = async (
  quizId: string,
  studentId: string
) => {
  const response = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/students/${studentId}/attempt`
  );
  return response.data;
};

export const findAttemptById = async (attemptId: string) => {
  const response = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/${attemptId}`
  );
  return response.data;
};