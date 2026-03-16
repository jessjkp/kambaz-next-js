/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../database";

const initialState = {
  assignments: assignments,
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      const newAssignment = { ...action.payload, _id: Date.now().toString() };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, action) => {
        state.assignments = state.assignments.filter(
        (a: any) => a._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === action.payload._id ? action.payload : a
      ) as any;
    }
  },
});
export const { addAssignment, deleteAssignment, updateAssignment} = assignmentSlice.actions;
export default assignmentSlice.reducer;