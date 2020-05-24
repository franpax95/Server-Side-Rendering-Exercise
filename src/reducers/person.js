import { createSlice } from '@reduxjs/toolkit';
import fetch from 'isomorphic-fetch';

const initialState = {
    name: 'John Doe',
    age: 35,
    friends: {
        isLoading: false,
        data: []
    }
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
        },
        fetchFriendsStart: state => {
            state.friends.isLoading = true;
        },
        fetchFriendsSuccess: (state, action) => {
            state.friends.isLoading = false;
            state.friends.data = action.payload;
        }
    }
});

export const { ageIncrement, ageDecrement, setAge } = slice.actions;

export const fetchFriends = () => dispatch => {
    const { fetchFriendsStart, fetchFriendsSuccess } = slice.actions;

    dispatch(fetchFriendsStart());

    return fetch('http://localhost:8081/api/friends')
        .then(response => response.json())
        .then(json => json.friends)
        .then(friends => dispatch(
            fetchFriendsSuccess(friends)
        ))
        .catch(err => {
            console.log(err);
        });
}

export default slice.reducer;