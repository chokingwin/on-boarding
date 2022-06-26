import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface UserState {
    isLogin: boolean;
    isSubmit: boolean;
}

const initialState: UserState = sessionStorage.getItem('user') ?
    JSON.parse(sessionStorage.getItem('user') as string)
    :
    {
        isLogin: false,
        isSubmit: false,
    };

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isLogin = true;
        },
        submitSuccess: (state) => {
            state.isSubmit = true;
        },
    }
});

export const { loginSuccess, submitSuccess } = userSlice.actions;

export const selectIsLogin = (state: RootState) => state.user.isLogin;
export const selectIsSubmit = (state: RootState) => state.user.isSubmit;

export default userSlice.reducer;
