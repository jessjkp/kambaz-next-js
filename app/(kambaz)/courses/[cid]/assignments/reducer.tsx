/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignments: [],
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignments = [...state.assignments, action.payload] as any;
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== action.payload
      ) as any;
    },
    updateAssignment: (state, action) => {
      if (!action.payload) return;
      state.assignments = state.assignments.map((a: any) =>
        a._id === action.payload._id ? action.payload : a
      ) as any;
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentSlice.actions;

export default assignmentSlice.reducer;