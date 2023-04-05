import {useDispatch, useSelector} from 'react-redux'
import {voteFor} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { url } from '../utils/config'
import { useContext } from 'react'
import { NotificationContext } from '../context/notificationContext' 

// All commented code corresponds to the redux-toolkit 
// implementation of the same functionality currently implemented through ReactQuery

const AnecdoteList = () => {
    //let anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    //const dispatch = useDispatch()

    // UseReducer and Context Notification Implementation
    const [notificationMsg, notificationDispatch] = useContext(NotificationContext)
    /////////////////////////////////////////////////////

    //React query implementation
    const query = useQueryClient()
    const result = useQuery(
        'anecdotes',
        () => axios.get(url).then(res => res.data)
    )

    const voteMutation = useMutation((id) => {
      const anecdote = anecdotes.find((elmnt) => elmnt.id === id)
      return axios.put(`${url}/${id}`, {...anecdote, votes: anecdote.votes + 1})
      },
      { onSuccess: () => {
        query.invalidateQueries('anecdotes')
      }}
    )

    if (result.isLoading) {
        return <div>loading data...</div>
    }

    let anecdotes = result.data
    /////////////////////////////

    let displayAnecdotes = anecdotes
    if (filter !== '') {
        displayAnecdotes = anecdotes.filter((anecdote) => anecdote.content.includes(filter))
    }

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        voteMutation.mutate(anecdote.id) //React Query Implementation
        notificationDispatch({ type: 'UPDATE', payload: `You voted '${anecdote.content}'`})
        setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
        //dispatch(voteFor(anecdote.id))
        //dispatch(setNotification(`You voted '${anecdote.content}'`, 5000))
    }

    return (
    <div>
      <h2>Anecdotes</h2>
      {displayAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList