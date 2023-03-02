const SearchFilter = ({filter, handleFilterChange}) => {
    return(
      <form>
        filter shown with <input value={filter} onChange={handleFilterChange}/>
      </form>
    )
}

export default SearchFilter