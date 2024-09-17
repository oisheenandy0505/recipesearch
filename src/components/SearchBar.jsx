function SearchBar({ setQuery }) {
    return (
      <input
        type="text"
        placeholder="Search for recipes..."
        onChange={(e) => setQuery(e.target.value)}
      />
    );
  }
  
  export default SearchBar;
  