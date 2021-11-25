import {useEffect, useState} from "react";
import {Box, Button, Link, TextField, Typography} from "@mui/material";
import axios from "axios";
import {Link as RouterLink, MemoryRouter as Router} from "react-router-dom";
// import "../mocks/searchResultMock";


function SearchBar(props){
  const [searchItem, setSearchItem] = useState(props.searchKey || '');
  // const [searchResult, setSearchResult] = useState();

  // async function getSearchResult(){
  //   try{
  //     const response = await axios.get('/search', {
  //       data: {
  //         searchKey: searchItem
  //       }
  //     });
  //     const data = response.data;
  //     setSearchResult(data.scholarList);
  //     // console.log(searchResult);
  //   } catch (err){
  //     console.log(err);
  //   }
  // }

  const handleInputChange = e => setSearchItem(e.target.value);
  const handleClick = e => {
    console.log(`searchItem: ${searchItem}`);
    // getSearchResult();
    // axios.get('/search', {
    //   data: {
    //     searchKey: searchItem
    //   }
    // })
    //   .then(res => setSearchResult(res.data.scholarList))
    //   .catch(e => console.log(e));
    // console.log('searchResult: ');
    // console.log(searchResult);
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
    >
      <TextField id="outlined-basic" label="Search key" variant="outlined" value={searchItem} onChange={handleInputChange}/>
      {/*<div>*/}
        {/*<Router>*/}
          <Button variant="contained" size="small" onClick={handleClick} component={RouterLink} to={`/search/${searchItem}`}>Search</Button>
        {/*</Router>*/}
      {/*</div>*/}
      {/*{searchResult && <Typography variant="body2" color="textSecondary" align="center">*/}
      {/*  {searchResult[0].name}*/}
      {/*</Typography>}*/}
    </Box>
  );
}

export default SearchBar;
