/** Vendors */
import { Box, Typography } from "@mui/material";

/** Custom Components */
import AppLayout from "./components/shared/layout/App";

function App() {
  return (
    <AppLayout>
      <Box component="section" sx={{ bgcolor: "#1B1B1D", height: "100vh" }}>
        <Typography sx={{ color: "white", fontSize: 24 }}>
          Build weather integration
        </Typography>
      </Box>
    </AppLayout>
  );
}

export default App;
