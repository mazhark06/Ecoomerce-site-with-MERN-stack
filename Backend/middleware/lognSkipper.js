import { verifyJWT } from "../utils/generateTokens.js"
import Apiresponse from "../utils/Apiresponse.js"

const userLoginSkipper = async(req, res) => {
  try {
    let token =  req.cookies.refreshToken || req.headers['authorization']?.split(" ")[1]

    if (token) {
      let validToken = verifyJWT(token)
      if(validToken) return  res.status(200).json(new Apiresponse('200' , 'User Authorized' , true , false))
     
    }
    
    return
    
  } catch (error) {
    console.log(error, "In loggin skipper");
    
  }
}
export default userLoginSkipper