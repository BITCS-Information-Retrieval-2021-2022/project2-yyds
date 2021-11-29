import {Link} from "@mui/material";
import React from "react";
import {Item, Row} from "@mui-treasury/components/flex";
import {Info, InfoSubtitle, InfoTitle} from "@mui-treasury/components/info";
import {useTrendInfoStyles} from "@mui-treasury/styles/info/trend";
import {AttributionRounded, DateRangeRounded, InterestsOutlined} from "@mui/icons-material";

function PaperAbstract(props) {
  const paper = props.paper;
  
  return (
    // <ListItem key={paper["paperId"]}>   {/*TODO: use unique key*/}
    //   <ListItemText
    //     primary={
    //       <React.Fragment>
    //         <Link underline="none" href={paper["url"]}>
    //           {paper["title"]}
    //         </Link>
    //       </React.Fragment>
    //     }
    //     secondary={
    //       <React.Fragment>
    //         {paper["year"] + ", " + paper["venue"]}
    //         <br />
    //         {paper["authors"].map((author, index) => (
    //           <span>
    //             {index ? ", ": ""}
    //             <Link href={`/author/${author["authorId"]}`}>
    //               {author["name"]}
    //             </Link>
    //           </span>
    //         ))}
    //       </React.Fragment>
    //     }
    //   />
    // </ListItem>
    <Row gap={2} p={2.5}>
      <Row wrap grow gap={0.5} minWidth={0}>
        <Item grow minWidth={0}>
          <Info useStyles={useTrendInfoStyles}>
            <InfoTitle>
              <Link underline="none" href={paper["url"]}>
                {paper["title"]}
              </Link>
            </InfoTitle>
            <InfoSubtitle>
              <DateRangeRounded color={"secondary"} fontSize={"inherit"} /> {paper["year"]} {'\u00A0'}
              <InterestsOutlined color={"secondary"} fontSize={"inherit"} /> {paper["venue"]}
            </InfoSubtitle>
            {/*<br />*/}
            <InfoSubtitle>
              <AttributionRounded color={"secondary"} fontSize={"inherit"} />{'\u00A0'}
              {paper["authors"].map((author, index) => (
                <React.Fragment>
                  {index ? ", ": ""}
                  <Link href={`/author/${author["authorId"]}`}>
                    {author["name"]}
                  </Link>
                </React.Fragment>
              ))}
            </InfoSubtitle>
          </Info>
        </Item>
      </Row>
    </Row>
  );
}

export default PaperAbstract;
