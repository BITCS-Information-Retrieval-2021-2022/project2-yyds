import {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
// import axios from "axios";
import {Link as RouterLink, useNavigate} from "react-router-dom";
// import "../mocks/searchResultMock";


function SearchBar(props){
  const [searchItem, setSearchItem] = useState(props.searchKey || '');
  // const [searchResult, setSearchResult] = useState();
  const navigate = useNavigate();

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
  const handleKeyPress = e => {
    if(e.key === "Enter"){
      navigate(`/search/${searchItem}`);
    }
  };

  return (
    <Box
      // container
      component="form"
      sx={{
        // '& > :not(style)': {
          m: 1, width: '100%', height: '50%'
        // },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
      alignItems="center"
      // spacing={"5%"}
    >
      {/*<Grid item md={8}>*/}
      <Box sx={{width: "40%"}}>
        <TextField id="outlined-basic" sx={{height: "100%", width: "100%"}} label="Search key" variant="outlined"  value={searchItem} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        {/*Notice: the height of TextField is not able to be justified as you want, AFAIK*/}
      </Box>
      {/*</Grid>*/}
      {/*<div>*/}
        {/*<Router>*/}
      {/*<Grid item md={4}>*/}
      <Box sx={{width: "10%", ml: "5%"}}>   {/* ml is inside width */}
        <Button variant="contained" sx={{height: "100%", width: "100%"}} onClick={handleClick} component={RouterLink} to={`/search/${searchItem}`}>Search</Button>
      </Box>
      {/*</Grid>*/}
        {/*</Router>*/}
      {/*</div>*/}
      {/*{searchResult && <Typography variant="body2" color="textSecondary" align="center">*/}
      {/*  {searchResult[0].name}*/}
      {/*</Typography>}*/}
    </Box>
  );
}

export default SearchBar;
