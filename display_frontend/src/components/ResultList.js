import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Divider, Grid, Pagination, Stack, useMediaQuery} from "@mui/material";
// import "../mocks/searchResultMock"; //uncomment this line to use Mock //TODO: comment this line
import AuthorAbstract from "./AuthorAbstract";
import {Column} from "@mui-treasury/components/flex";
import config from "../config";


function ResultList(props){
  const [searchResult, setSearchResult] = useState({});
  const [page, setPage] = useState(1);
  const totalNum = searchResult["totalNum"];
  const authorList = searchResult["authors"];
  const numsPerPage = 10;
  const authorListRef = useRef();
  const matches = useMediaQuery("(max-width:760px)");

  useEffect(() => {
    const getSearchResult = async function () {
      try {
        const response = await axios.get(config.backend_base_url+'/search', {
          params: {
            key: props.searchKey
          }
        });
        // console.log(response);
        setSearchResult(response.data);
        // console.log(searchResult);
      } catch (err) {
        console.log(err);
      }
    };
    getSearchResult();
    // console.log(searchResult);
  }, [props.searchKey]);

  // console.log(searchResult);
  // console.log(props.searchKey);

  const handlePageChange = (event, value) => {
    setPage(value);
    let topOffset = authorListRef.current.getBoundingClientRect().top;
    // console.log(authorListRef.current.getBoundingClientRect());
    window.scrollBy(0, topOffset-props.navBarHeight);
  };

  return (
    // <Grid
    //   container
    //   // margin={"auto"}
    //   justifyContent={"center"}
    // >
    //   <Grid item md={12}>
    //     <List sx={{
    //       width: '100%', bgcolor: 'background.paper',
    //     }}>
    //         {authorList && authorList.slice(numsPerPage*(page-1), numsPerPage*page).map(author => (
    //         // <ListItem key={author["key"]}>   {/*TODO: use unique key*/}
    //         //   {/*<ListItemAvatar>*/}
    //         //   {/*  <Avatar>*/}
    //         //   {/*    <ImageIcon />*/}
    //         //   {/*  </Avatar>*/}
    //         //   {/*</ListItemAvatar>*/}
    //         //   <ListItemText primary={author["name"]} secondary={author["academicTitle"]} />
    //         // </ListItem>
    //         <AuthorAbstract author={author} />
    //         ))}
    //         </List>
    //   </Grid>
    //   <Grid item md={12}>
    //     <Stack spacing={2}>
    //       <Typography>Page: {page}</Typography>
    //       <Pagination count={Math.ceil(totalNum/numsPerPage)} page={page} onChange={handlePageChange} />
    //     </Stack>
    //   </Grid>
    // </Grid>
    <Grid container ref={authorListRef}>
      <Column p={0} gap={0} marginY={"2vh"} marginX={"auto"} sx={{
        width: '90%',
        borderRadius: 16,
        boxShadow: '0 8px 16px 0 #BDC9D7',
        overflow: 'hidden'
      }}
      >
        {authorList && authorList.slice(numsPerPage*(page-1), numsPerPage*page).map((author, index) => (
          <React.Fragment>
            {index ?
            <Divider variant={"middle"} sx={{bgcolor: '#d9e2ee', margin: "0 20px"}}/>
              : null
            }
            <AuthorAbstract author={author} />
          </React.Fragment>
        ))}
      </Column>
      <Grid item xs={12} marginY={"20px"}>
        <Stack spacing={2} marginX={"20vw"}>
          {/*<Typography>Page: {page}</Typography>*/}
          <Pagination
            color={"primary"}
            variant={"outlined"}
            shape={"rounded"}
            sx={{margin: "auto"}}
            count={Math.ceil(totalNum/numsPerPage)}
            page={page}
            onChange={handlePageChange}
            boundaryCount={matches?0:2}
            siblingCount={matches?0:1}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ResultList;
