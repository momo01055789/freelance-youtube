import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const HeroSection = styled("section")(({}) => ({
  background: "linear-gradient(135deg, #1e1e1e 0%, #424242 100%)",
  color: "white",
  padding: "120px 0",
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
}));

const HeroTitle = styled(Typography)({
  fontWeight: 800,
  marginBottom: "24px",
  background: "linear-gradient(45deg, #ff4d4d, #f9cb28)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  display: "inline-block",
});

const Hero = () => {
  return (
    <HeroSection>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Typography
            variant="h6"
            color="primary.light"
            gutterBottom
            sx={{ fontWeight: 600, letterSpacing: 1 }}
          >
            WELCOME TO HISTORY & SPORTS HUB
          </Typography>

          <HeroTitle variant="h2" component="h1">
            Explore the World of Sports, Fitness & History
          </HeroTitle>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
              opacity: 0.9,
            }}
          >
            Join our community of enthusiasts as we explore fascinating
            historical events, sports analysis, and fitness tips to keep you
            informed and inspired.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              color="error"
              size="large"
              component={Link}
              to="/videos"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "50px",
                boxShadow: "0 4px 14px rgba(244, 67, 54, 0.4)",
              }}
            >
              Watch Latest Videos
            </Button>
          </Box>
        </Box>
      </Container>
    </HeroSection>
  );
};

export default Hero;
