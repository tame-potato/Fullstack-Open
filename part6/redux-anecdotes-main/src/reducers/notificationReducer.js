import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotification(state, action) {
            return action.payload
        },
        clearNotification(state) {
            return initialState
        }
    }
})

export const setNotification = (msg, delay) => {
    return (dispatch) => {
        dispatch(updateNotification(msg))
        setTimeout(() => dispatch(clearNotification()), delay)
    }
}

export const {updateNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer