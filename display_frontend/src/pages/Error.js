import React from "react";
import {CssBaseline, Grid, Typography} from "@mui/material";
import Copyright from "../components/Copyright";
import NavigationBar from "../components/NavigationBar";


function Error(){
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        sx={{margin: 'auto', height: "100vh"}}
        justifyContent={"center"}
      >
        <Grid item xs={12}>
          <NavigationBar searchKey="" />
        </Grid>
        <Grid item container xs={12}
              marginX={"2.5%"} marginTop={"80px"}
              height={"45%"} alignContent={"center"} justifyContent={"center"}
        >
          <Typography variant="h4" textAlign={"center"}>
            Why you come here?🤯
          </Typography>
        </Grid>
        <Grid item container xs={12} height={"30%"} alignContent={"flex-end"} justifyContent={"center"}>
          <Copyright />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Error;
