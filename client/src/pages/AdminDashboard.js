import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  AppBar,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import cache from "../utils/cache";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const adminData = localStorage.getItem("admin");

    if (!token || !adminData) {
      navigate("/login");
      return;
    }

    setAdmin(JSON.parse(adminData));
  }, [navigate]);

  const { title, description, category } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Create FormData for file upload
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      data.append("category", category);
      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/videos",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess("Video added successfully!");

        // Clear video cache to force refresh on homepage
        cache.clear();
        console.log("Cache cleared after adding new video");

        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          thumbnail: null,
        });
        setPreviewImage("");
        // Reset file input
        document.getElementById("thumbnail-input").value = "";
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to add video. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {admin?.username}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        <Box sx={{ marginTop: 4, marginBottom: 8 }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography component="h1" variant="h4" gutterBottom>
              Add New Video
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Fill in the details to add a new video to the collection
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
                {success}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="title"
                    label="Video Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    id="description"
                    label="Description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      id="category"
                      name="category"
                      value={category}
                      label="Category"
                      onChange={handleChange}
                    >
                      <MenuItem value="sports">Sports</MenuItem>
                      <MenuItem value="fitness">Fitness</MenuItem>
                      <MenuItem value="history">History</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button variant="outlined" component="label" fullWidth>
                    Upload Thumbnail
                    <input
                      type="file"
                      hidden
                      id="thumbnail-input"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {previewImage && (
                    <Box sx={{ mt: 2, textAlign: "center" }}>
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                      />
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                  >
                    {loading ? "Adding Video..." : "Add Video"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default AdminDashboard;
