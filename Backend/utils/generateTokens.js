import jwt from 'jsonwebtoken'

const generateRefreshToken= async function(id){
let token = jwt.sign({
    _id:id
}, process.env.REFRESH_SECRET_KEY,{
    expiresIn : '7d'
} )
return token
}

const generateAccessToken= async function(id){
let token = jwt.sign({
    _id:id
}, process.env.ACCESS_SECRET_KEY,{
    expiresIn : '1d'
} )
return token
}
const verifyJWT  = async function (token) {
    try {
        let validToken = await jwt.verify(token , process.env.REFRESH_SECRET_KEY)
        if (!validToken) {
           return null
        }
        return validToken
        
    } catch (error) {
       console.log(error);
       return null
        
    }
}
export {
generateAccessToken,
generateRefreshToken,
verifyJWT
}