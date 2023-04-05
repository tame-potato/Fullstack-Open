import {configureStore} from '@reduxjs/toolkit'
import anecdoteSliceReducer from './reducers/anecdoteReducer'
import filterSliceReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
        anecdote: anecdoteSliceReducer,
        filter: filterSliceReducer,
        notification: notificationReducer
    }
})

export default store