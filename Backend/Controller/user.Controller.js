import Apiresponse from "../utils/Apiresponse.js";
import User from "../models/user.model.js";
import {
  generateRefreshToken,
  generateAccessToken,
  verifyJWT
} from "../utils/generateTokens.js";

const userSignup = async (req, res ) => {
  
  if (!req.body) return res.json(new Apiresponse(402, 'body is khali '))
    
  try {
    let { username,  password, email } = req.body;

    if (!username || !email || !password)
      return res
        .status(401)
        .json(new Apiresponse(401, "All Credentials required"));

    let userExist = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

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
      .json(new Apiresponse(200, "User Created Successfully",true , false, {accessToken}));
  } catch (error) {
    console.log(error);
    res.json(new Apiresponse(402, "Signup Failed",false, true, req.body));
  }
};


const userLogin = async (req, res) => {


  const {username , password}  = req.body
  // console.log(req.body);
  
    if(!username || !password) return res.status(401).json(new Apiresponse(402, 'Please enter your credentials'))
  let userExist = await User.findOne({
$or:[
    {username : username},
    {email:username}
]
}).select('+password')
if(!userExist) return res.status(401).json(new Apiresponse(402,'User not exist'))
    
    let isValidPass = await userExist.isMatchPassword(password)
    if(!isValidPass) return res.json(new Apiresponse(402,'Invalid credentials'))
        let accessToken = await generateAccessToken(userExist._id)
      // console.log(accessToken);
      
        let refreshToken = await generateRefreshToken(userExist._id)
        return res.status(200)
        .cookie('refreshToken' , refreshToken ,{
            secure :false,
            maxAge: 24 * 60 * 60 * 3600
        })
        .json(new Apiresponse(200, 'User Login' , true , false , {accessToken}))
};

const userAuthchecker = async (req,res) => {
  res.send('home')
}


export { userSignup, userLogin , userAuthchecker};
