import JWT from 'jsonwebtoken'
import userModels from '../models/userModels.js';
export const requireSignIn = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized: Token missing or incorrect format',
        });
      }
      const token = authHeader.split(' ')[1];
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next(); 
    } catch (error) {
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
        res.status(401).send({
            success:false,
            message:"error in the authorization"
        })
    }
}