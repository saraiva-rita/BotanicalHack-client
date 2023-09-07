/* import { useState } from "react";

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
export default SearchBar; */
import { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInput = (e) => {
    setSearchQuery(e.target.value);
    // eslint-disable-next-line react/prop-types
    props.searchPlant(e.target.value);
  };

  return (
    <TextField
      placeholder="search by plant name"
      variant="outlined"
      value={searchQuery}
      onChange={handleInput}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}

      sx={{width: '300px'}}
    />
  );
}

export default SearchBar;