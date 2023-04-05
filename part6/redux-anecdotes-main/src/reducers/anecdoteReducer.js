import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../utils/config'

const voteSort = (a, b) => {
  if (a.votes < b.votes) return 1
  if (a.votes > b.votes) return -1
  return 0
}

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    votes: 0
  }
}

export const fetchInitialAnecdotes = () => {
  return async (dispatch) => {
    const response = await axios.get(url)
    dispatch(setAnecdotes(response.data))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const response = await axios.post(url, asObject(content))
    dispatch(addAnecdote(response.data))
  }
}

export const voteFor = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdote.find((elmnt) => elmnt.id === id)
    const response = await axios.put(`${url}/${id}`, anecdote)
    dispatch(voteAnecdote(response.data.id))
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      return state.concat(action.payload)
    },
    voteAnecdote(state, action) {
      return state.map((anecdote) => {
        const voteCount = anecdote.id === action.payload ? anecdote.votes + 1 : anecdote.votes
        return {...anecdote, votes: voteCount}
      }).sort(voteSort)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {addAnecdote, voteAnecdote, setAnecdotes} = anecdoteSlice.actions
export default anecdoteSlice.reducer
