import JWT from 'jsonwebtoken'
import userModels from '../models/userModels.js';

// export const requireSignIn=async(req,res,next)=>{
//     try {
//         const decode=JWT.verify(req.headers.authorization, 'JHDHKSDJJNjjndndsj97373')
//         req.user=decode
//         next();
//     } catch (error) {
//         console.log("Error in the jsonwebtoken",error)
//     }
// }
export const requireSignIn = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized: Token missing or incorrect format',
        });
      }
  
      // Extract the token from the header
      const token = authHeader.split(' ')[1]; // Get the token after "Bearer "
      const decoded = JWT.verify(token, 'JHDHKSDJJNjjndndsj97373'); // JWT secret key
  
      // Attach the decoded token to the request object (e.g., user data)
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.log("Error in the jsonwebtoken:", error);
      res.status(401).send({
        success: false,
        message: 'Unauthorized: Invalid or expired token',
      });
    }
  };
  

export const isAdmin= async(req,res,next)=>{
    try {
        const user= await userModels.findById(req.user._id)

        if(user.role!==1){
            res.status(401).send({
                success:false,
                message:"unothrized User",
                error
            })
        }
        else{
            next();
        }
        
    } catch (error) {
        console.log("error in autorization:", error)
        res.status(401).send({
            success:false,
            message:"error in the authorization"
        })
    }
}