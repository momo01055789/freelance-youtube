const Video = require("../models/Video");
const { cloudinary } = require("../config/cloudinary");

// ... rest of your controller code
// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
exports.getVideos = async (req, res) => {
  try {
    const { category } = req.query;

    // Build query
    const query = {};
    if (category) {
      query.category = category;
    }

    const videos = await Video.find(query).sort("-createdAt");

    // Set cache headers - cache for 5 minutes
    res.set({
      "Cache-Control":
        "public, max-age=300, s-maxage=300, stale-while-revalidate=60",
      ETag: `"${Date.now()}"`,
    });

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
exports.getVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: "Video not found",
      });
    }

    // Set cache headers - cache for 10 minutes
    res.set({
      "Cache-Control":
        "public, max-age=600, s-maxage=600, stale-while-revalidate=120",
      ETag: `"${video._id}-${video.updatedAt}"`,
    });

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Create new video
// @route   POST /api/v1/videos
// @access  Private/Admin
// In controllers/videoController.js
exports.createVideo = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    // Log file upload info
    console.log("Uploaded file:", req.file);

    // Create video data object
    const videoData = {
      title,
      description,
      category,
    };

    // If file was uploaded, use it; otherwise use default
    if (req.file) {
      videoData.thumbnail = {
        public_id: req.file.filename, // Cloudinary public ID
        url: req.file.path, // Cloudinary URL
      };
      console.log("Thumbnail uploaded:", videoData.thumbnail);
    } else {
      console.warn("No file uploaded, using default thumbnail");
      videoData.thumbnail = {
        public_id: "",
        url: "https://via.placeholder.com/1280x720",
      };
    }

    const video = await Video.create(videoData);

    const response = {
      success: true,
      data: {
        ...video._doc,
        thumbnail: {
          url: video.thumbnail.url,
          public_id: video.thumbnail.public_id,
        },
      },
    };

    res.status(201).json(response);
  } catch (err) {
    console.error("Error creating video:", err);

    if (req.file && req.file.public_id) {
      try {
        await cloudinary.uploader.destroy(req.file.public_id);
      } catch (cloudinaryErr) {
        console.error("Error cleaning up Cloudinary file:", cloudinaryErr);
      }
    }
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Private/Admin
exports.updateVideo = async (req, res) => {
  try {
    const { title, description, videoId, category } = req.body;

    let video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: "Video not found",
      });
    }

    // Update fields
    video.title = title || video.title;
    video.description = description || video.description;
    video.videoId = videoId || video.videoId;
    video.category = category || video.category;

    await video.save();

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Private/Admin
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: "Video not found",
      });
    }

    await video.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
