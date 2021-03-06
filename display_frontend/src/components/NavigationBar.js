import {Grid, Link, Typography, createTheme, ThemeProvider} from "@mui/material";
import SearchBar from "./SearchBar";
import React from "react";

const NavigationBar = React.forwardRef((props, ref) => {
  // let theme = createTheme({
  //   typography: {
  //     h6: {
  //       fontSize: "1rem",
  //       '@media (max-width:584px)': {
  //         fontSize: "0.7rem"
  //       }
  //     }
  //   }
  // });
  // const theme = createTheme({
  //   components: {
  //     // Name of the component
  //     MuiTypography: {
  //       // defaultProps: {
  //       //   fontSize: '1rem',
  //       //   '@media (max-width:584px)': {
  //       //     fontSize: "0.7rem"
  //       //   }
  //       // },
  //       styleOverrides: {
  //         // Name of the slot
  //         root: {
  //           // Some CSS
  //           fontSize: '1rem',
  //           '@media (max-width:584px)': {
  //             fontSize: "0.7rem"
  //           }
  //         },
  //       },
  //     },
  //   },
  // });
  const theme = createTheme({     //TODO: For god's sake, please use custom variants !!!
    typography: {
      navBarTitle: {
        // color: 'red',
        fontSize: '1rem',
        '@media (max-width:584px)': {
          fontSize: '0.7rem',
          // lineHeight: 1.5,     //TODO: Please notice that line-height should be used on a 'p' element.
        }
      }
    }
  });
  // theme = responsiveFontSizes(theme);

  return (
    <Grid
      container
      // justifyContent={"center"}
      alignItems={"center"}
      position={"fixed"}
      zIndex={9999}
      top={0}
      left={0} right={0}
      // bgcolor={"rgba(169,195,233,0.8)"}
      bgcolor={"background.paper"}
      height={"80px"}
      // borderRadius={4}
      sx={{borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}
      // borderBottomLeftRadius={4}
      // borderBottomRightRadius={4}
      boxShadow={'0 0 8px 0 #BDC9D7'}
      ref={ref}
    >
      <Grid
        item
        // md={2}
        position={"absolute"}
        // marginLeft={"2vw"}
        width={"20%"}
        height={"inherit"}
      >
        <Grid
          container
          textAlign={"center"}
          sx={{height: "inherit", padding: "5px"}}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Link color="inherit" underline="none" href="/">
            <ThemeProvider theme={theme}>
            {/*  <CssBaseline />*/}
              <Typography variant={"navBarTitle"} component={"p"}>  {/*TODO: For god's sake, please make the component
                                                                        of 'Typography' be 'p'. It automatically changes
                                                                        to 'span' once you use custom variants!*/}
                YYDS<br/>Scholar Search Engine
              </Typography>
            </ThemeProvider>
          </Link>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        // marginTop={"1vh"}
      >
        <SearchBar searchKey={props.searchKey} />
      </Grid>
    </Grid>
  );
});

export default NavigationBar;
