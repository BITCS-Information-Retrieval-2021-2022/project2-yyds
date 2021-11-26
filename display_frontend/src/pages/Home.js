import React from "react";
import SearchBar from "../components/SearchBar";
import Copyright from "../components/Copyright";
import {Box, CssBaseline, Typography} from "@mui/material";

function Home(){
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{margin: 'auto', height: "100vh"}}>
        {/*<Test />*/}
        <Box textAlign={"center"} pt={"25vh"}>
          <Typography variant="h4">
            YYDS - Scholar Search Engine
          </Typography>
        </Box>
        <Box height={"40vh"} pt={"5vh"} alignItems={"center"}>
          <SearchBar/>
        </Box>
        <Box pt={"15vh"}>
          <Copyright />
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Home;
