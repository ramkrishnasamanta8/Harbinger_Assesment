import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField(state, action) {
      const { fieldId, value } = action.payload;
      state.formData[fieldId] = value;
    },
    submitForm(state) {
      console.log('Form submitted:', state.formData);
    },
  },
});

export const { updateField, submitForm } = formSlice.actions;
export default formSlice.reducer;
