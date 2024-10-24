import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    userdata: {}
};

const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true,
            state.userdata = action.payload.userData
        },
        logout: (state) => {
            console.log(state)
            state.isLoggedIn = false,
            state.userdata = null
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;