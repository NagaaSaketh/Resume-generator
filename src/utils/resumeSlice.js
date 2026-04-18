import { createSlice } from "@reduxjs/toolkit";

const resumeSlice = createSlice({
  name: "resume",
  initialState: null,
  reducers: {
    addResume: (state, action) => {
      return action.payload;
    },
    removeResume: (state, action) => {
      return null;
    },
  },
});

export const { addResume, removeResume } = resumeSlice.actions;
export default resumeSlice.reducer;
