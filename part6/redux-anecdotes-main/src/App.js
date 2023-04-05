import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect, useReducer } from 'react'
//import { useDispatch } from 'react-redux'
//import { fetchInitialAnecdotes } from './reducers/anecdoteReducer'
import {NotificationContext, notificationReducer} from './context/notificationContext'

const App = () => {
  ///Redux implementation

  /*const dispatch = useDispatch()
  
  useEffect(() => {    
    dispatch(fetchInitialAnecdotes())   
  }, [dispatch])*/

  /////////////////////// 

  const [notificationMsg, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notificationMsg, notificationDispatch]}>
      <Notification/>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </NotificationContext.Provider>
  )
}

export default App