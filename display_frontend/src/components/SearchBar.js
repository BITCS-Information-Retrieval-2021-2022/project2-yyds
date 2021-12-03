import {useState} from "react";
import {Box, Button, TextField} from "@mui/material";
// import axios from "axios";
// import {Link as RouterLink, useNavigate} from "react-router-dom";
import {SearchRounded} from "@mui/icons-material";
// import "../mocks/searchResultMock";

// Copyright © bluebirds-ly
// NOTE: There are mainly two means to deal with the input&submit logic.
//
//   One way is to use the pure html logic. In this way, you should
//   use "form" as the parent, "action" property of "form" to denote
//   the submit address, define "name" property of text-input element,
//   and set the type of button element to "submit".
//     Advantages: You don't need to deal with the "click-button" or
//       "keypress-enter" event, both of which will trigger the submit
//       process. Besides, this way can handle the empty-input-processing
//       logic very well. Just add "required" property of text-input
//       element, and don't add "noValidate" to "form" element. Everything
//       else will be handled by the html logic, the behavior of which is
//       decided by the browser.
//     Disadvantages: The params when submitting will be appended to the
//       content of "action" as "?name=value", and the route should be just
//       the content of "action". You can get the params using the "useLocation"
//       hook of "react-router-dom" and "qs" library like qs.parse(location.search,
//       {ignoreQueryPrefix: true}). However, this will trigger the submit
//       event whenever you click it, regardless of whether the content changes.
//
//   The other way is to use the *real* react-router logic combined with MUI.
//   Thus you should use "useState" to keep the input text, add "component={Link}
//   to={"submit address"}" to the button or just use "Link" from MUI, handle
//   the "click" and "keypress" event by yourself, in which you can add the "empty-
//   input-processing" logic.
//     Advantages: The view won't be reloaded if the content didn't change. And
//       you can get the params using "useParams" hook, with ":param" as the route.
//     Disadvantages: You will have to deal with each event and additional logic
//       by yourself.


function SearchBar(props){
  const [searchItem, setSearchItem] = useState(props.searchKey || '');
  // const [searchResult, setSearchResult] = useState();
  // const navigate = useNavigate();

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
    // console.log(`searchItem: ${searchItem}`);
    // e.preventDefault();
    // navigate(`/search/${searchItem}`);
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
      // navigate(`/search/${searchItem}`);
    }
  };

  return (
    <Box
      // container
      component="form"
      action="/search"
      sx={{
        // '& > :not(style)': {
          m: 1, width: '100%', height: '50%'
        // },
      }}
      // noValidate
      autoComplete="off"
      display="flex"
      justifyContent="center"
      alignItems="center"
      // spacing={"5%"}
    >
      {/*<Grid item md={8}>*/}
      <Box sx={{width: "40%"}}>
        <TextField
          id="outlined-basic"
          sx={{height: "100%", width: "100%"}}
          label="Search key"
          variant="outlined"
          value={searchItem}
          required
          type={"search"}
          name={"searchKey"}
          // title={"Empty!"}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        {/*Notice: the height of TextField is not able to be adjusted as you want, AFAIK*/}
      </Box>
      {/*</Grid>*/}
      {/*<div>*/}
        {/*<Router>*/}
      {/*<Grid item md={4}>*/}
      <Box sx={{width: "10%", ml: "5%"}}>   {/* ml is inside width */}
        <Button
          variant="contained"
          startIcon={<SearchRounded />}
          sx={{height: "100%", width: "100%"}}
          onClick={handleClick} 
          // component={RouterLink}
          // to={`/search/${searchItem}`}
          type={"submit"}
        >
          Search
        </Button>
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
