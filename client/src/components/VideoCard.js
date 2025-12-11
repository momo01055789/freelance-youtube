import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  width: "200px",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
  borderRadius: "12px",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    "&:hover": {
      transform: "translateY(-4px)",
    },
  },
}));

const VideoThumbnail = styled(Box)({
  position: "relative",
  paddingTop: "56.25%", // 16:9 aspect ratio
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  "&:hover .play-icon": {
    opacity: 1,
    transform: "scale(1)",
  },
});

const PlayIcon = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "20%",
  left: "38%",
  color: "white",
  fontSize: "3rem",
  opacity: 0.9,
  transition: "all 0.3s ease",
  textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "3rem",
  },
}));

const VideoCard = ({ video }) => {
  // Generate YouTube thumbnail URL from video ID
  const getThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const thumbnailUrl = video.thumbnail?.url || getThumbnailUrl(video.videoId);

  return (
    <StyledCard elevation={3}>
      <CardActionArea
        component="a"
        href={
          video.videoId
            ? `https://www.youtube.com/watch?v=${video.videoId}`
            : "#"
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        <VideoThumbnail>
          <CardMedia
            component="img"
            image={thumbnailUrl}
            alt={video.title}
            loading="lazy"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <PlayIcon className="play-icon">
            <PlayCircleOutlineIcon fontSize="inherit" />
          </PlayIcon>
          {video.duration && (
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                px: 1,
                borderRadius: "4px",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {video.duration}
            </Box>
          )}
        </VideoThumbnail>
        <CardContent
          sx={{
            flexGrow: 1,
            p: { xs: 1.5, sm: 2 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="subtitle1"
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "0.95rem", sm: "1rem" },
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mb: 1,
              height: { xs: "2.8em", sm: "3.2em" },
              lineHeight: 1.4,
            }}
          >
            {video.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              mt: 1,
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              height: { xs: "2.4em", sm: "2.6em" },
              lineHeight: 1.3,
            }}
          >
            {video.description}
          </Typography>
          {video.createdAt && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: "auto",
                pt: 1,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            >
              {formatDate(video.createdAt)}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default VideoCard;
