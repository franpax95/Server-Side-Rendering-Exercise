import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'John Doe',
    age: 35
};

export const slice = createSlice({
    name: "person",
    initialState,
    reducers: {
        ageIncrement: state => {
            state.age += 1;
        },
        ageDecrement: state => {
            state.age -= 1;
        },
        setAge: (state, action) => {
            state.age = action.payload;
        }
    }
});

export const { ageIncrement, ageDecrement, setAge } = slice.actions;
export default slice.reducer;