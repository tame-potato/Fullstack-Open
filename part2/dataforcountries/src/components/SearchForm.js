const SearchForm = ({value, handlerChange}) => {
    return(
        <form>
            find countries containing:
            <input value={value} onChange={handlerChange}/> 
        </form>
    )
}

export default SearchForm