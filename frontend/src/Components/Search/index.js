import React, {useEffect} from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const Search = (props) =>{

  const [query, setQuery] = React.useState('');
  const handleChange = event => {
    setQuery(event.target.value)
  };
    return(
        <form className={props.classes.search} onSubmit={props.submit(query)}>
        <InputBase
          placeholder="Search…"
          classes={{
            root: props.classes.inputRoot,
            input: props.classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleChange}
          value={query}
        />
        {props.children}
      </form>
    )
}

export default Search