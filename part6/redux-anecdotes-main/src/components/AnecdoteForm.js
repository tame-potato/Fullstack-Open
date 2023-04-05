import { asObject, createAnecdote } from '../reducers/anecdoteReducer'
//import { useDispatch } from 'react-redux'
//import { setNotification } from '../reducers/notificationReducer'
import { useMutation, useQueryClient } from 'react-query'
import { url } from '../utils/config'
import axios from 'axios'
import { useContext } from 'react'
import { NotificationContext } from '../context/notificationContext' 

// All commented code corresponds to the redux-toolkit 
// implementation of the same functionality currently implemented through ReactQuery

const AnecdoteForm = () => {
    //const dispatch = useDispatch()

    // UseReducer and Context Notification Implementation
    const [notificationMsg, notificationDispatch] = useContext(NotificationContext)
    /////////////////////////////////////////////////////
    
    //React Query implementation
    const query = useQueryClient()
    const anecdoteMutation = useMutation((newAnecdote) => 
        {
            if (newAnecdote.content.length < 5) {
                notificationDispatch({ type: 'UPDATE', payload: `Anecdotes must be at least 5 characters long`})
                setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
                return null
            }
            return axios.post(url, newAnecdote).then(res => res.data)
        }, 
        { onSuccess: () => {
            query.invalidateQueries('anecdotes')
        }
    })
    ////////////////////////////

    const create = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        anecdoteMutation.mutate(asObject(content)) //React query implementation
        notificationDispatch({ type: 'UPDATE', payload: `You created '${content}'`})
        setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
        //dispatch(createAnecdote(content))
        //dispatch(setNotification(`You created ${content}`, 5000))
    }
      
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input name='note'/></div>
                <button>create</button>
            </form>
        </div>
      )

}

export default AnecdoteForm