import Apiresponse from "../utils/Apiresponse.js"
import { verifyJWT } from "../utils/generateTokens.js"

const userAuthentication = async(req,res,next)=>{
    try {
        let token =  req.cookies.refreshToken || req.headers.authorization?.split(' ')[1]
        console.log('token', token );
        
        if(!token) return res.json(new Apiresponse(401, 'Unauthorized',false,true ))
            let decoded = await verifyJWT(token)
        if(!decoded) return res.json(new Apiresponse(401, 'Invalid Token',false,true ))
        req.user = decoded
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json(new Apiresponse(500,'Internal Server Error ' , false , true,error.message) )
        
    }


}
export{
    userAuthentication
}