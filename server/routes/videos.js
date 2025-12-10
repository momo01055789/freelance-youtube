// routes/videos.js
const express = require("express");
const router = express.Router();
const { upload } = require("../config/cloudinary");
const { protect } = require("../middleware/auth");
const {
  getVideos,
  getVideo,
  createVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

// Public routes
router.get("/", getVideos);

// Protected routes (admin only)
router.post("/", protect, upload.single("thumbnail"), createVideo);

router
  .route("/:id")
  .get(getVideo)
  .put(protect, upload.single("thumbnail"), updateVideo)
  .delete(protect, deleteVideo);

module.exports = router;
