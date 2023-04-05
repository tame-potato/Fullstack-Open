//import { useSelector } from 'react-redux'
import { useContext } from 'react'
import { NotificationContext } from '../context/notificationContext' 

// All commented code corresponds to the redux-toolkit 
// implementation of the same functionality currently implemented through UseReducer and Context

const Notification = () => {

  //const notification = useSelector(state => state.notification)

  //UseReducer and Context Implementation
  const [notificationMsg, notificationDispatch] = useContext(NotificationContext)
  let notification = notificationMsg
  ///////////////////////////////////////

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification