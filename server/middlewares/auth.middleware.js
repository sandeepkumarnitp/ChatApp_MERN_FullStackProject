import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utily.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return next(new errorHandler("Invalid token", 400));
  }

  const tokenData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = tokenData; // token milne ke baad requ.user me tokenData add kar do

  next();
});

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{2,19}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  if(!usernameRegex.test(username)){
    return next(new errorHandler("Please enter a valid username and password!!",400))
  }
  if(!passwordRegex.test(password)){
    return next(new errorHandler("Please enter a valid username and password!!",400))
  }

  next();
});
