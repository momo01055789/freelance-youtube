import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import VideoCard from "./VideoCard";
import axios from "axios";

// Mock data - replace with actual data from your API
const mockVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "The Most Amazing Sports Moments of 2023",
    views: "1.2M",
    date: "2 weeks ago",
    duration: "8:45",
    category: "sports",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Full Body Workout for Beginners",
    views: "856K",
    date: "3 weeks ago",
    duration: "15:20",
    category: "fitness",
  },
  {
    id: "dQw4w9WgXcQ",
    title: "Ancient Civilizations: The Rise and Fall",
    views: "2.1M",
    date: "1 month ago",
    duration: "22:10",
    category: "history",
  },
  // Add more mock videos as needed
];

const VideoGrid = ({
  category,
  title = "Featured Videos",
  maxVideos = 6,
  showAll = false,
}) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const url = category
          ? `http://localhost:5000/api/v1/videos?category=${category}`
          : `http://localhost:5000/api/v1/videos`;
        const response = await axios.get(url);
        if (response.data.success) {
          setVideos(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [category]);

  // Limit the number of videos to display if not showing all
  const displayVideos = showAll ? videos : videos.slice(0, maxVideos);

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 5, md: 6 },
        backgroundColor: "background.paper",
        px: { xs: 2, sm: 3, md: 0 },
      }}
    >
      <Container maxWidth={showAll ? "xl" : "xl"}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: { xs: 3, sm: 3.5, md: 4 },
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.125rem" },
            textAlign: showAll ? "center" : "left",
            fontWeight: 700,
            textAlign: "center",
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              width: { xs: "60px", sm: "70px", md: "80px" },
              height: "4px",
              background: "linear-gradient(45deg, #ff4d4d, #f9cb28)",
              margin: "12px auto 0",
              borderRadius: "2px",
            },
          }}
        >
          {title}
        </Typography>

        <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
          {loading ? (
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ textAlign: "center", py: 4 }}>
                Loading videos...
              </Typography>
            </Grid>
          ) : (
            displayVideos.map((video) => (
              <Grid
                item
                key={video._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                sx={{
                  display: "flex",
                }}
              >
                <VideoCard video={video} />
              </Grid>
            ))
          )}
        </Grid>

        {displayVideos.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No videos found in this category.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default VideoGrid;
