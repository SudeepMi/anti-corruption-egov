const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const API = require("../model/apiList");
const Developer = require("../model/Developer");
const Marketplace = require("../model/MarketPlace");

// @desc    Creates a new event event
// @route   POST /api/events
// @access  Public
const createAPI = asyncHandler(async (req, res) => {
  const api = ({ name, description, endpoint } = req.body);

  const __event = await API.create(api);
  
  if (__event) {
    res.status(201).json({
      success: true,
      error: "",
      __event,
    });
  } else {
    res.status(400);
    throw new Error("Invalid api data");
  }
});

// @desc    Creates a new event event
// @route   POST /api/events
// @access  Public
const createAPIMarketPlace = asyncHandler(async (req, res) => {
  const api = ({ name, description, endpoint,userid } = req.body);

  const __event = await Marketplace.create(api);
  
  if (__event) {
    res.status(201).json({
      success: true,
      error: "",
      __event,
    });
  } else {
    res.status(400);
    throw new Error("Invalid api data");
  }
});

// @desc    Get event event
// @route   GET /api/events/event
// @access  Private
const getAPIs = asyncHandler(async (req, res) => {
  const event = await API.find().all();
  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("APIs not found");
  }
});

// @desc    Get event event
// @route   GET /api/events/event
// @access  Private
const getMarketPlaceAPIs = asyncHandler(async (req, res) => {
  const event = await Marketplace.find().all().populate("userid","username");
  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("APIs not found");
  }
});

const useAPI = asyncHandler(async (req, res) => {
  const api_id = req.body.api_id;
  const userid = req.user.id;
  const api_key = crypto.randomBytes(11).toString('hex');
  const create__ = await Developer.create({
    api_id,
    api_key,
    userid,
    count:0,
  });
  const api = await Developer.find({ userid: req.user._id }).populate("api_id");
  if (create__ && api) {
    res.json(api);
  } else {
    res.status(404);
    throw new Error("API not found");
  } 
});
      

// @desc    Update event event
// @route   PUT /api/events/event
// @access  Private
const updateAPI = asyncHandler(async (req, res) => {
  const event = await API.findById(req.params.id);

  if (event) {
    await API.updateOne({ id: req.params.id }, req.body);
    const __event = await API.find({ eventid: req.params.id });
    res.json({
      __event,
    });
  } else {
    res.status(404);
    throw new Error("API not found");
  }
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getAPIById = asyncHandler(async (req, res) => {
  const event = await API.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404);
    throw new Error("API not found");
  }
});

// @desc    Get event by ID
// @route   GET /api/events/:id
// @access  Public
const getAPIByUserId = asyncHandler(async (req, res) => {
  const api = await Developer.find({ userid: req.user._id }).populate("api_id");
  if (api) {
    res.json(api);
  } else {
    res.status(404);
    throw new Error("API not found");
  }
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteAPI = asyncHandler(async (req, res) => {
  const event = await User.findById(req.params.id);

  if (event) {
    await event.remove();
    res.json({ message: "API removed" });
  } else {
    res.status(404);
    throw new Error("API not found");
  }
});

module.exports = {
  createAPI,
  getAPIs,
  updateAPI,
  getAPIById,
  deleteAPI,
  getAPIByUserId,
  useAPI,
  createAPIMarketPlace,
  getMarketPlaceAPIs,
};