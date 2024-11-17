import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PollState {
  votes: Record<string, string>;
}

const initialState: PollState = {
  votes: {},
};

const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    submitVote: (state, action: PayloadAction<{ questionId: string; optionId: string }>) => {
      const { questionId, optionId } = action.payload;
      state.votes[questionId] = optionId;
    },
  },
});

export const { submitVote } = pollSlice.actions;
export default pollSlice.reducer;
