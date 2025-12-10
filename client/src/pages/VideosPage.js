import React from "react";
import { Box, Typography, Container } from "@mui/material";
import VideoGrid from "../components/VideoGrid";

const VideosPage = () => {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ mb: 4, fontWeight: 600 }}
        >
          All Videos
        </Typography>
        <VideoGrid title="Latest Uploads" showAll={true} />
      </Container>
    </Box>
  );
};

export default VideosPage;
