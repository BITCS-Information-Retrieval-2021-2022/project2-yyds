import {Box, Container, Grid, Link, Typography} from "@mui/material";
import SearchBar from "./SearchBar";
import React from "react";

function NavigationBar(props) {
  return (
    <Grid
      container
      // justifyContent={"center"}
      alignItems={"center"}
      position={"fixed"}
      zIndex={9999}
      top={0} left={0} right={0}
      bgcolor={"#d9e2ee"}
      height={"80px"}
    >
      <Grid
        item
        // md={2}
        position={"absolute"}
        marginLeft={"2vw"}
      >
        <Box textAlign={"center"}>
          <Link color="inherit" underline="none" href="/">
            <Typography variant="body1">
              YYDS - Scholar Search Engine
            </Typography>
          </Link>
        </Box>
      </Grid>
      <Grid
        item
        md={12}
        marginTop={"1vh"}
      >
        <SearchBar searchKey={props.searchKey} />
      </Grid>
    </Grid>
  );
}

export default NavigationBar;
