import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setOpenSnackbar(true);

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box id="contact" sx={{ py: 8, backgroundColor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 6,
            fontWeight: 700,
            textAlign: "center",
            position: "relative",
            "&:after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "4px",
              background: "linear-gradient(45deg, #ff4d4d, #f9cb28)",
              margin: "12px auto 0",
              borderRadius: "2px",
            },
          }}
        >
          Get In Touch
        </Typography>

        <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 2 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 600, mb: 3 }}
                >
                  Contact Information
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Have questions or feedback? Feel free to reach out to us
                  through any of the following channels.
                </Typography>

                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EmailIcon color="primary" sx={{ mr: 2 }} />
                    <Typography>contact@historysportshub.com</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <PhoneIcon color="primary" sx={{ mr: 2 }} />
                    <Typography>+1 (555) 123-4567</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                    <Typography>
                      123 Sports Ave, History City, HC 12345
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 4 }} />

                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    Follow Us
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <IconButton
                      color="primary"
                      href="https://facebook.com"
                      target="_blank"
                      sx={{
                        backgroundColor: "action.hover",
                        "&:hover": { backgroundColor: "action.selected" },
                      }}
                    >
                      <FacebookIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href="https://twitter.com"
                      target="_blank"
                      sx={{
                        backgroundColor: "action.hover",
                        "&:hover": { backgroundColor: "action.selected" },
                      }}
                    >
                      <TwitterIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href="https://instagram.com"
                      target="_blank"
                      sx={{
                        backgroundColor: "action.hover",
                        "&:hover": { backgroundColor: "action.selected" },
                      }}
                    >
                      <InstagramIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      href="https://youtube.com"
                      target="_blank"
                      sx={{
                        backgroundColor: "action.hover",
                        "&:hover": { backgroundColor: "action.selected" },
                      }}
                    >
                      <YouTubeIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={7}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{ fontWeight: 600, mb: 3 }}
                    >
                      Send Us a Message
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: "50px",
                        boxShadow: "0 4px 14px rgba(25, 118, 210, 0.4)",
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Thank you for your message! We'll get back to you soon.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ContactSection;
