
const NotificationBanner = ({msg, color}) => {
    if (msg === null) { return null }
    const style = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        whiteSpace: 'pre-line' 
    }
    return (
        <div style={style}> 
            <text>{msg}</text> 
        </div>
    )
}

const SuccessNotification = ({msg}) => {
    return(<NotificationBanner msg={msg} color={'green'}/>)
}

const ErrorNotification = ({msg}) => {
    return(<NotificationBanner msg={msg} color={'red'}/>)    
}

export default {
    SuccessNotification,
    ErrorNotification
}