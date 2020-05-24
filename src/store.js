import person from './reducers/person';
import { configureStore } from '@reduxjs/toolkit';

export default (initialState) => configureStore({
    reducer: {
        person
    },
    preloadedState: initialState
});