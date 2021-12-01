import React from "react";
import {Avatar, Link} from "@mui/material";
import bengioPng from "../assets/bengio.png";
import {Item, Row} from "@mui-treasury/components/flex";
import {useDynamicAvatarStyles} from '@mui-treasury/styles/avatar/dynamic';
import {useTrendInfoStyles} from '@mui-treasury/styles/info/trend';
import {Info, InfoSubtitle, InfoTitle} from "@mui-treasury/components/info";
import {ApartmentRounded, WorkOutlineRounded} from "@mui/icons-material";


function AuthorAbstract(props) {
  const author = props.author;
  const avatarStyles = useDynamicAvatarStyles({ size: 56, radius: 6 });
  return (
    // <ListItem key={author["key"]}>   {/*TODO: use unique key*/}
    //   <Link href={`/author/${author["authorId"]}`}>
    //     <ListItemAvatar>
    //       <Avatar src={bengioPng} />
    //     </ListItemAvatar>
    //   </Link>
    //   <ListItemText
    //     primary={
    //       <React.Fragment>
    //         <Link underline="none" href={`/author/${author["authorId"]}`}>
    //           {author["name"]}
    //         </Link>
    //       </React.Fragment>
    //     }
    //     secondary={
    //       <React.Fragment>
    //         {author["academicTitle"]}
    //         <br />
    //         {author["affiliations"] && author["affiliations"].join(", ")}
    //       </React.Fragment>
    //     }
    //   />
    // </ListItem>
    <Row gap={2} p={2.5}>
      <Item alignSelf={"center"}>
        <Link href={`/author/${author["authorId"]}`}>
          <Avatar variant={"rounded"} classes={avatarStyles} src={bengioPng} />   {/*TODO: use real image src*/}
        </Link>
      </Item>
      <Row wrap grow gap={0.5} minWidth={0}>
        <Item grow minWidth={0}>
          <Info useStyles={useTrendInfoStyles}>
            <InfoTitle>
              <Link underline="none" href={`/author/${author["authorId"]}`}>
                {author["name"]}
              </Link>
            </InfoTitle>
            <InfoSubtitle>
              {/*<Box component={"span"} display={"flex"} alignItems={"center"}>*/}
                <WorkOutlineRounded color={"secondary"} fontSize={"inherit"} /> {author["academicTitle"]}
              {/*</Box>*/}
            </InfoSubtitle>
              {/*<br />*/}
            <InfoSubtitle>
              <ApartmentRounded color={"secondary"} fontSize={"inherit"}/> {author["affiliations"] && author["affiliations"].join(", ")}
            </InfoSubtitle>
          </Info>
        </Item>
      </Row>
    </Row>
  );
}

export default AuthorAbstract;
