import Apiresponse from "../utils/Apiresponse.js";
import User from "../models/user.model.js";
import {
  generateRefreshToken,
  generateAccessToken,
  verifyJWT
} from "../utils/generateTokens.js";

const userSignup = async (req, res ) => {
  // console.log(req);
  console.log(req.body);
  
  if (!req.body) return res.json(new Apiresponse(402, 'body is khali '))
  try {
    let { username,  password, email } = req.body;
console.log(username);

    if (!username || !email || !password)
      return res
        .status(401)
        .json(new Apiresponse(401, "All Credentials required"));

    let userExist = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
console.log(userExist);

    if (userExist)
      return res.json(new Apiresponse(402, "User Already exists"));

    let user = await User.create({ username, email, password });
    let refreshToken = await generateRefreshToken(user._id);
    let accessToken = await generateAccessToken(user._id);
    
    let updateToken = await User.findByIdAndUpdate(user._id , {
        refreshToken :refreshToken
    })

    res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
      })
      .json(new Apiresponse(200, "User Created Successfully", {accessToken}));
  } catch (error) {
    console.log(error);
    res.json(new Apiresponse(402, "Signup Failed", req.body, error));
  }
};


const userLogin = async (req, res) => {
    
//     const authToken = req.header('Authorization')?.split(' ')[1] || req.cookies.refreshToken
//     console.log(authToken);
    
// if(authToken){
//     let validToken = await verifyJWT(authToken)
//     if(validToken) return res.status(200, 'Authorized' , {redirect : '/' , success : true})
// }

  const {username , password}  = req.body
    if(!username || !password) return res.json(new Apiresponse(402, 'Please enter your credentials'))
  let userExist = await User.findOne({
$or:[
    {username : username},
    {email:username}
]
}).select('+password')
if(!userExist) return res.status(402, 'User not found')
    
    let isValidPass = await userExist.isMatchPassword(password)
    if(!isValidPass) return res.json(new Apiresponse(402,'Invalid credentials'))
        let accessToken = await generateAccessToken(userExist._id)
        let refreshToken = await generateRefreshToken(userExist._id)
        return res.status(200)
        .cookie('refreshToken' , refreshToken ,{
            secure :false,
            maxAge: 24 * 60 * 60 * 3600
        })
        .json(new Apiresponse(200, 'User Login' , {accessToken}))
};

export { userSignup, userLogin };
