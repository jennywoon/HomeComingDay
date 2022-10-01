import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: {}
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        showError(state, action) {
            state.error = action.payload;
        },
    }
});

export const { showError } = errorSlice.actions;
export default errorSlice.reducer;