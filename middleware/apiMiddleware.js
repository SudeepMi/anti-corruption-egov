const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/Users");
const Developer = require("../model/Developer");
const checkKey = asyncHandler(async (req, res, next) => {

  let token;
  if (
    req.headers['x-api-key'] 
  ) {
    try {
  
      token = req.headers['x-api-key'];
      const api = await Developer.findOne({ api_key: token }).populate("api_id");
      if(api && api.api_id.endpoint.split("?")[0] === req.protocol+"://"+req.get("host")+req.originalUrl.split("?")[0]){
        req.api_key = token;
      next();
      }else{
        res.status(401).send("API key is not valid for this endpoint");
      }

    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const handleAPIcall = asyncHandler(async (req, res, next) => {
    const api_key = req.api_key;
    const api = await Developer.findOne({ api_key: api_key });
   
    if(api){
        const call = api.call || 0;
        const newcall = call + 1;
        const update = await Developer.findOneAndUpdate({ api_key: api_key }, { call: newcall });
        if(update){
            console.log(update);
            next();
        }else{
            res.status(500);
            throw new Error("Error updating API call");
        }
    }else{
        res.status(500);
        throw new Error("Error updating API call");
    }
});




module.exports = { checkKey, handleAPIcall };