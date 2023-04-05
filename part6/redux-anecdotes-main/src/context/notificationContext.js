import { createContext } from 'react'

export const NotificationContext = createContext()

export const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            return action.payload
        case 'CLEAR':
            return null
        default:
            return state
    }
}

