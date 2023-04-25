import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: true
}


const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        loadingStart: (state) => {
            state.loading = false
        },
        loadingSuccess: (state, action) => {
            state.loading = true;
            state.currentUser = action.payload
        },
        loadingFail: (state) => {
            state.loading = false;
            state.error = true
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        },
        subscribe: (state, action) => {
            if (state.currentUser.subscribedUsers.includes(action.payload)) {
                state.currentUser.subscribedUsers.splice(
                    state.currentUser.subscribedUsers.findIndex(
                        (channelId) => channelId = action.payload
                    ),
                    1
                )
            } else {
                state.currentUser.subscribedUsers.push(action.payload)
            }
        }
    }
})


export const { loadingStart, loadingSuccess, loadingFail, logout, subscribe } = userSlice.actions;

export default userSlice.reducer