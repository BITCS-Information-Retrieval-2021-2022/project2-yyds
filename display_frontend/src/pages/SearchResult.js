import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {CssBaseline, Grid} from "@mui/material";
import Copyright from "../components/Copyright";
import ResultList from "../components/ResultList";
// import SearchBar from "../components/SearchBar";
import NavigationBar from "../components/NavigationBar";
import qs from "qs";


function SearchResult(){
  // let {searchKey} = useParams();
  // let searchKey = props.location.query.searchKey;    //no longer exist in react-router > v4
  let location = useLocation();
  let {searchKey} = qs.parse(location.search, { ignoreQueryPrefix: true});
  const navBarRef = useRef();
  const [navBarHeight, setNavBarHeight] = useState(0);

  useEffect(() => {
    setNavBarHeight(navBarRef.current.clientHeight);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        sx={{margin: 'auto'}}
        justifyContent={"center"}
      >
        <Grid item xs={12}>
          <NavigationBar searchKey={searchKey} ref={navBarRef}/>
        </Grid>
          {/*<SearchBar searchKey={searchKey} />*/}
        {/*{console.log(navBarRef.current.clientHeight)}*/}
        <Grid item xs={12} marginX={"2.5%"} marginTop={navBarHeight+"px"}>
          <ResultList searchKey={searchKey} navBarHeight={navBarHeight}/>
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
