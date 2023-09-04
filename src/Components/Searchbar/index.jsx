import { useState } from "react";

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
    // eslint-disable-next-line react/prop-types
    props.searchPlant(e.target.value);
  };


  return (
    <input type="text" value={searchQuery} onChange={handleInput} placeholder="search by plant name"/>
  
  );
}
export default SearchBar;