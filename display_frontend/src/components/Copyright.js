import {
  Typography, Link, Box
} from "@mui/material";
import React from "react";


function Copyright(){
  return (
    <Box textAlign={"center"} py={4}>
      <Box py={0.5}>
        <Typography variant='body2' color='textSecondary'>
          Made with ❤️ in BIT
        </Typography>
      </Box>
      <Box py={0.5}>
        <Typography variant="body2" color="textSecondary">
          {'Copyright © '}
          <Link color="inherit" href="https://github.com/BITCS-Information-Retrieval-2021-2022/project2-yyds">
            YYDS
          </Link>
          {' | ' + new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
}

export default Copyright;
