import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume",
  initialState: [],
  reducers: {
    addResume: (state, action) => {
      return action.payload
    },
    removeResume: (state, action) => {
      return state.filter((resume) => resume._id !== action.payload);
    },
  },
});

export const { addResume, removeResume } = resumeSlice.actions;
export default resumeSlice.reducer;
