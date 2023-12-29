import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "")
    
        if(!token) {
            throw new ApiError(401, "You are not authorized to access this route")
        }
    
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decoded?._id).select("-password -refreshToken")
    
        if(!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.user = user;
        next()
        
    } catch (error) {
        throw new ApiError(401, error?.message || "You are not authorized to access this route")
    }
})