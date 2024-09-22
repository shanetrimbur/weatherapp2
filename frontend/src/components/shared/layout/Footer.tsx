/** Vendors */
import { Grid, Typography } from "@mui/material";

function AppFooter() {
  return (
    <Grid container direction="row">
      <Grid item md={4} sm={6} xs={12}>
        <Typography sx={{ color: "#aaa", fontSize: 20 }}>
          Some Footer Links and Copyright Stuff
        </Typography>
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Typography sx={{ color: "#aaa", fontSize: 20 }}>Column 2</Typography>
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <Typography sx={{ color: "#aaa", fontSize: 20 }}>Column 3</Typography>
      </Grid>
    </Grid>
  );
}

export default AppFooter;
