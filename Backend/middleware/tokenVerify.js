import Apiresponse from "../utils/Apiresponse.js"
import { verifyJWT } from "../utils/generateTokens.js"

const userAuthentication = async(req,res,next)=>{
    try {
        let token = req.headers["Authentication"]?.split(' ')[1] || req.cookies.refreshToken
        console.log(token);
        
        if(!token) return res.json(new Apiresponse(401, 'Unauthorized' ))
            let decoded = await verifyJWT(token)
        req.user = decoded
        console.log(decoded);
        next()
    } catch (error) {
        console.log(error);
        
    }


}
export{
    userAuthentication
}