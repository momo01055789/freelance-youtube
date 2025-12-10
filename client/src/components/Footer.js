import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Divider,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6, 0),
  marginTop: "auto",
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              History & Sports Hub
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, mb: 2 }}
            >
              Exploring the fascinating worlds of sports, fitness, and history
              through engaging content and community discussions.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                sx={{ color: "text.secondary" }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                size="small"
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
                sx={{ color: "text.secondary" }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                size="small"
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                sx={{ color: "text.secondary" }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                size="small"
                href="https://youtube.com"
                target="_blank"
                aria-label="YouTube"
                sx={{ color: "text.secondary" }}
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Categories
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <li>
                <MuiLink
                  component={Link}
                  to="/sports"
                  color="text.secondary"
                  display="block"
                  sx={{
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Sports
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={Link}
                  to="/fitness"
                  color="text.secondary"
                  display="block"
                  sx={{
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Fitness
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={Link}
                  to="/history"
                  color="text.secondary"
                  display="block"
                  sx={{
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  History
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={Link}
                  to="/latest"
                  color="text.secondary"
                  display="block"
                  sx={{
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Latest Videos
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={Link}
                  to="/popular"
                  color="text.secondary"
                  display="block"
                  sx={{
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Most Popular
                </MuiLink>
              </li>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
              <li>
                <MuiLink
                  component={Link}
                  to="/about"
                  color="text.secondary"
                  display="block"
                  sx={{
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  About Us
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={Link}
                  to="/contact"
                  color="text.secondary"
                  display="block"
                  sx={{
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Contact
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={Link}
                  to="/privacy"
                  color="text.secondary"
                  display="block"
                  sx={{
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Privacy Policy
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={Link}
                  to="/terms"
                  color="text.secondary"
                  display="block"
                  sx={{
                    mb: 1,
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  Terms of Service
                </MuiLink>
              </li>
              <li>
                <MuiLink
                  component={Link}
                  to="/faq"
                  color="text.secondary"
                  display="block"
                  sx={{
                    textDecoration: "none",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  FAQ
                </MuiLink>
              </li>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              gutterBottom
              sx={{ fontWeight: 600 }}
            >
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Subscribe to our newsletter for the latest updates, videos, and
              exclusive content.
            </Typography>
            <Box component="form" sx={{ display: "flex", gap: 1 }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  padding: "10px 16px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  border: "none",
                  padding: "0 20px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "0.5px",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#1565c0")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1976d2")}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            © {currentYear} History & Sports Hub. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <MuiLink
              component={Link}
              to="/privacy"
              color="text.secondary"
              variant="body2"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={Link}
              to="/terms"
              color="text.secondary"
              variant="body2"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Terms of Service
            </MuiLink>
            <MuiLink
              component={Link}
              to="/sitemap"
              color="text.secondary"
              variant="body2"
              sx={{
                textDecoration: "none",
                "&:hover": { color: "primary.main" },
              }}
            >
              Sitemap
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
