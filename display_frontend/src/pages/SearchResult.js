import React from "react";
import {useParams} from "react-router-dom";
import {CssBaseline, Grid} from "@mui/material";
import Copyright from "../components/Copyright";
import ResultList from "../components/ResultList";
// import SearchBar from "../components/SearchBar";
import NavigationBar from "../components/NavigationBar";


function SearchResult(){
  let {searchKey} = useParams();
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        sx={{margin: 'auto'}}
        justifyContent={"center"}
      >
        <Grid item xs={12}>
          <NavigationBar searchKey={searchKey}/>
        </Grid>
          {/*<SearchBar searchKey={searchKey} />*/}
        <Grid item xs={12} marginX={"2.5%"} marginTop={"80px"}>
          <ResultList searchKey={searchKey} />
        </Grid>
          {/*{props.params.searchKey}*/}
          {/*{searchKey}*/}
        <Grid item xs={12}>
          <Copyright />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

// class SearchResult extends React.Component{
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (
//       <Paper sx={{p:2, margin: 'auto'}}>
//         {/*<ResultList />*/}
//         {this.props.params.searchKey}
//         <Copyright />
//       </Paper>
//   );
//   }
// }

export default SearchResult;
