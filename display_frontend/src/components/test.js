import {
  Grid, Paper, Typography, ButtonBase, styled, Container, Box, TextField, Button
} from "@mui/material";


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

// export default function ComplexGrid() {
//   return (
//     <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         <Grid item>
//           <ButtonBase sx={{ width: 128, height: 128 }}>
//             <Img alt="complex" src="https://mui.com/static/images/grid/complex.jpg" />
//           </ButtonBase>
//         </Grid>
//         <Grid item xs={12} sm container>
//           <Grid item xs container direction="column" spacing={2}>
//             <Grid item xs>
//               <Typography gutterBottom variant="subtitle1" component="div">
//                 Standard license
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 Full resolution 1920x1080 • JPEG
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 ID: 1030114
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Typography sx={{ cursor: 'help' }} variant="body2">
//                 Remove
//               </Typography>
//             </Grid>
//           </Grid>
//           <Grid item>
//             <Typography variant="subtitle1" component="div">
//               $19.00
//             </Typography>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }


function Test(){
  return (
    <Container align="center">
      <Typography variant="h2">
        YYDS - Scholar Search Engine
      </Typography>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button variant="text">Submit</Button>
      </Box>
    </Container>
  );
}

export default Test;






// import React from 'react';
//
// import {
//   CategoryProvider,
//   CategoryTitle,
//   CategoryItem,
// } from '@mui-treasury/components/menu/category';
// import {
//   SocialProvider,
//   SocialLink,
// } from '@mui-treasury/components/socialLink';
// import { useBallSocialLinkStyles } from '@mui-treasury/styles/socialLink/ball';
//
// import { useNikiCategoryMenuStyles } from '@mui-treasury/styles/categoryMenu/niki';
// import { ColumnToRow, Row, Item } from '@mui-treasury/components/flex';
// import {
//   EmailSubscribe,
//   EmailTextInput,
//   SubmitButton,
// } from '@mui-treasury/components/EmailSubscribe';
// import { useInfoEmailSubscribeStyles } from '@mui-treasury/styles/emailSubscribe/info';
// import ArrowForward from '@material-ui/icons/ArrowForward';
//
// import Box from '@material-ui/core/Box';
// import Divider from '@material-ui/core/Divider';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
//
// import { FontProvider, Font } from 'website/src/components/Font';
//
// export const OceanAppFooterDemo = React.memo(function OceanAppFooter() {
//   return (
//     <FontProvider fonts={[{ font: 'Oswald' }]}>
//       <Box width={'100%'} px={{ xs: 2, sm: 3, lg: 4 }}>
//         <Box pt={6} pb={{ md: 6 }}>
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={4} lg={3}>
//               <Box
//                 component={'img'}
//                 mt={-3}
//                 width={120}
//                 src="https://i.ya-webdesign.com/images/lines-design-png-10.png"
//                 alt=""
//               />
//               <Box>
//                 <SocialProvider useStyles={useBallSocialLinkStyles}>
//                   <SocialLink brand={'Envelope'} />
//                   <SocialLink brand={'GooglePlus'} />
//                   <SocialLink brand={'Pinterest'} />
//                   <SocialLink brand={'Dribbble'} />
//                 </SocialProvider>
//               </Box>
//             </Grid>
//             <Grid item xs={12} md={8} lg={5}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6} sm={4}>
//                   <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
//                     <CategoryTitle>
//                       <Font>Products</Font>
//                     </CategoryTitle>
//                     <CategoryItem>Snowflake Free</CategoryItem>
//                     <CategoryItem>Coloristic</CategoryItem>
//                     <CategoryItem>Summer free</CategoryItem>
//                     <CategoryItem>Lucky store</CategoryItem>
//                   </CategoryProvider>
//                 </Grid>
//                 <Grid item xs={6} sm={4}>
//                   <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
//                     <CategoryTitle>
//                       <Font>Information</Font>
//                     </CategoryTitle>
//                     <CategoryItem>License</CategoryItem>
//                     <CategoryItem>Privacy Policy</CategoryItem>
//                     <CategoryItem>Releases</CategoryItem>
//                     <CategoryItem>FAQ</CategoryItem>
//                   </CategoryProvider>
//                 </Grid>
//                 <Grid item xs={6} sm={4}>
//                   <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
//                     <CategoryTitle>
//                       <Font>About</Font>
//                     </CategoryTitle>
//                     <CategoryItem>Contact</CategoryItem>
//                     <CategoryItem>Team</CategoryItem>
//                     <CategoryItem>Support</CategoryItem>
//                   </CategoryProvider>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={12} md={8} lg={4} style={{ marginLeft: 'auto' }}>
//               <CategoryProvider useStyles={useNikiCategoryMenuStyles}>
//                 <CategoryTitle>
//                   <Font>Subscribe</Font>
//                 </CategoryTitle>
//               </CategoryProvider>
//               <EmailSubscribe
//                 onSubmit={email => alert(`Your email is ${email}.`)}
//                 useStyles={useInfoEmailSubscribeStyles}
//                 inputClearedAfterSubmit
//               >
//                 <EmailTextInput placeholder="Email address" />
//                 <SubmitButton aria-label={'subscribe'}>
//                   <ArrowForward />
//                 </SubmitButton>
//               </EmailSubscribe>
//             </Grid>
//           </Grid>
//         </Box>
//         <Divider />
//         <ColumnToRow
//           at={'md'}
//           columnStyle={{ alignItems: 'center' }}
//           rowStyle={{ alignItems: 'unset'}}
//         >
//           <Item grow shrink={0}>
//             <Box py={1} textAlign={{ xs: 'center', md: 'left' }}>
//               <Typography
//                 component={'p'}
//                 variant={'caption'}
//                 color={'textSecondary'}
//               >
//                 Made with ❤️ in Thailand
//               </Typography>
//             </Box>
//           </Item>
//           <Item>
//             <Box py={1} textAlign={{ xs: 'center', md: 'right' }}>
//               <Typography
//                 component={'p'}
//                 variant={'caption'}
//                 color={'textSecondary'}
//               >
//                 ©Siriwatknp 2020 All right reserved
//               </Typography>
//             </Box>
//           </Item>
//         </ColumnToRow>
//       </Box>
//     </FontProvider>
//   );
// });
