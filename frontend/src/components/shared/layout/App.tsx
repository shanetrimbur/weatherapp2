import React from "react";

/** Vendors */
import { Container, Grid } from "@mui/material";

/** Custom Components */
import Footer from "./Footer";
import Navbar from "./Navbar";

function AppLayout({ children }: { children: React.ReactElement }) {
  return (
    <Grid container direction="column" space={10}>
      <Navbar />
      <Container maxWidth="xl">{children}</Container>
      <Footer />
    </Grid>
  );
}

export default AppLayout;
