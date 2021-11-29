import {useParams} from "react-router-dom";
import {Box, CssBaseline, Divider, Grid, Pagination, Stack} from "@mui/material";
import Copyright from "../components/Copyright";
import React, {useEffect, useState} from "react";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";
// import "../mocks/authorProfileMock"; //uncomment this line to use Mock //TODO: comment this line
import AuthorAbstract from "../components/AuthorAbstract";
import PaperAbstract from "../components/PaperAbstract";
import {Column, Item, Row} from "@mui-treasury/components/flex";
import config from "../config";
import NetworkRelationGraph from "../components/NetworkRelationGraph";


function AuthorProfile(){
  let {authorId} = useParams();
  const [authorProfile, setAuthorProfile] = useState();   //TODO: Boolean({}) is true!!!
  const [page, setPage] = useState(1);
  const paperNum = authorProfile && authorProfile["paperCount"];
  const paperList = authorProfile && authorProfile["papers"];  //TODO: "xxx &&" is important!
  const paperNumPerPage = 10;

  useEffect(() => {
    const getAuthorProfile = async function (){
      try {
        const response = await axios.get(config.backend_base_url+"/author", {
          params: {
            authorId: authorId
          }
        });
        setAuthorProfile(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAuthorProfile();
  }, [authorId]);

  console.log(authorProfile);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <React.Fragment>
    <CssBaseline />
    <Grid
      container
      sx={{margin: 'auto'}}
      justifyContent={"center"}
    >
      {/*<ResultList />*/}
      {/*{props.params.searchKey}*/}
      <Grid item xs={12}>
        <NavigationBar searchKey={""}/>
      </Grid>
      {/*{authorId}*/}
      <Grid item xs={12} marginX={"2.5%"} marginTop={"80px"}>
        {/*{console.log(authorProfile)}*/}
        <Grid container>
          <Column p={0} gap={0} marginY={"2vh"} marginX={"auto"} sx={{
            width: '90%',
            borderRadius: 16,
            boxShadow: '0 8px 16px 0 #BDC9D7',
            overflow: 'hidden'}}
          >
            {authorProfile && <AuthorAbstract author={authorProfile} />}    {/*TODO: "xxx &&" is important!*/}
          </Column>
        </Grid>
      </Grid>
      <Grid item xs={12} marginX={"2.5%"}>
        <Box marginX={"auto"} sx={{
          width: '90%',
          borderRadius: 4,
          boxShadow: '0 8px 16px 0 #BDC9D7',
          padding: '1%'}}
        >
          {/*{"Network graph."}  /!*TODO: graph*!/*/}
          {authorProfile && <NetworkRelationGraph author={authorProfile}/>}
        </Box>
      </Grid>
      <Grid item xs={12} marginX={"2.5%"}>
        <Grid container>
          <Column p={0} gap={0} marginY={"2vh"} marginX={"auto"} sx={{
            width: '90%',
            borderRadius: 16,
            boxShadow: '0 8px 16px 0 #BDC9D7',
            overflow: 'hidden'}}
          >
            <Row wrap p={2} alignItems={'baseline'} sx={{
              fontFamily: 'Barlow, san-serif',
              backgroundColor: '#f2f3f8'}}
            >
              <Item stretched sx={{
                color: '#122740',
                fontSize: '1.25rem',
                fontWeight: 600,}}
              >
                Paper List
              </Item>
              {/*<Item className={styles.actions}>*/}
              {/*  <Link className={styles.link}>Refresh</Link> •{' '}*/}
              {/*  <Link className={styles.link}>See all</Link>*/}
              {/*</Item>*/}
            </Row>
            {paperList && paperList.slice(paperNumPerPage*(page-1), paperNumPerPage*page).map((paper, index) => (
              // <ListItem key={author["key"]}>   {/*TODO: use unique key*/}
              //   {/*<ListItemAvatar>*/}
              //   {/*  <Avatar>*/}
              //   {/*    <ImageIcon />*/}
              //   {/*  </Avatar>*/}
              //   {/*</ListItemAvatar>*/}
              //   <ListItemText primary={author["name"]} secondary={author["academicTitle"]} />
              // </ListItem>
              <React.Fragment>
                {index ?
                  <Divider variant={"middle"} sx={{bgcolor: '#d9e2ee', margin: "0 20px"}}/>
                  : null
                }
                <PaperAbstract paper={paper} />
              </React.Fragment>
            ))}
          </Column>
        </Grid>
        <Grid item xs={12} marginY={"20px"}>
          <Stack spacing={2} marginX={"20vw"}>
            {/*<Typography>Page: {page}</Typography>*/}
            <Pagination color={"primary"} variant={"outlined"} shape={"rounded"} sx={{margin: "auto"}} count={Math.ceil(paperNum/paperNumPerPage)} page={page} onChange={handlePageChange} />
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Copyright />
      </Grid>
    </Grid>
    </React.Fragment>
  );
}

export default AuthorProfile;
