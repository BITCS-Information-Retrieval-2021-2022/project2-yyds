import React from "react";
import SearchBar from "../components/SearchBar";
import Copyright from "../components/Copyright";
import {CssBaseline, Grid, Typography, useMediaQuery} from "@mui/material";

function Home(){
  const matches = useMediaQuery("(max-width:490px)");
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container sx={{margin: 'auto', height: "100vh", justifyContent: "center", alignItems: "center"}}>
        {/*<Test />*/}
        <Grid item container xs={12}  height={"25%"} alignContent={"flex-end"} justifyContent={"center"}>  {/*pt={"25vh"}*/}
          <Typography variant="h4" textAlign={"center"}>
            YYDS{matches ? <br/> : " - "}Scholar Search Engine
          </Typography>
        </Grid>
        <Grid item container xs={12} height={"45%"} alignContent={"center"} justifyContent={"center"}>   {/*pt={"5vh"}*/}
          <SearchBar/>
        </Grid>
        <Grid item container xs={12} height={"30%"} alignContent={"flex-end"} justifyContent={"center"}>  {/*pt={"15vh"}*/}
          <Copyright />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Home;
