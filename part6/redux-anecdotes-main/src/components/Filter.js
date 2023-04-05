import {useDispatch} from 'react-redux'
import {updateFilter} from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const filterHandler = (event) => {
        dispatch(updateFilter(event.target.value))
    }

    return (
        <form>
            filter <input onChange={filterHandler}/>
        </form>
    )
}

export default Filter