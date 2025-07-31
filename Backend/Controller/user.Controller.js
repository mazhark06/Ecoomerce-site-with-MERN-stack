import Apiresponse from "../utils/Apiresponse.js";
import User from "../models/user.model.js";
import {
  generateRefreshToken,
  generateAccessToken,
  verifyJWT,
} from "../utils/generateTokens.js";

const userSignup = async (req, res) => {
  try {
    let { username, password, email } = req.body;

    if (!username || !email || !password)
      return res
        .status(401)
        .json(new Apiresponse(401, "All Credentials required"));

    let userExist = await User.findOne({
      email: email,
    });

    if (userExist) return res.json(new Apiresponse(402, "User Already exists"));

    let user = await User.create({ username, email, password });
    let refreshToken = await generateRefreshToken(user._id);
    let accessToken = await generateAccessToken(user._id);

    let updateToken = await User.findByIdAndUpdate(user._id, {
      refreshToken: refreshToken,
    });

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "None",
      })
      .cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "None",
      })
      .json(
        new Apiresponse(200, "User Created Successfully", true, false, {
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    console.log(error);
    res.json(new Apiresponse(402, "Signup Failed", false, true, req.body));
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);

  if (!email || !password)
    return res
      .status(401)
      .json(new Apiresponse(402, "Please enter your credentials", false, true));
  let userExist = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!userExist)
    return res
      .status(401)
      .json(new Apiresponse(402, "User not exist", false, true));

  let isValidPass = await userExist.isMatchPassword(password);
  if (!isValidPass)
    return res.json(new Apiresponse(402, "Invalid credentials", false, true));
  let accessToken = await generateAccessToken(userExist._id);
  // console.log(accessToken);

  let refreshToken = await generateRefreshToken(userExist._id);
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json(new Apiresponse(200, "User Login", true, false, { accessToken,refreshToken }));
};

const userLogout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      refreshToken: null,
    });
    res
      .clearCookie("refreshToken", {
        secure: false,
        sameSite: "None",
      })
      .clearCookie("accessToken", {
        secure: false,
        sameSite: "None",
      });
  } catch (error) {
    console.log(error);
    res.json(
      new Apiresponse(500, "Internal Server Error", false, true, error.message)
    );
  }
};
const userLoginSkipper = async (req, res) => {
  try {
    let token =
      req.cookies.accessToken || req.headers["authorization"]?.split(" ")[1];

    if (
      !token.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)
    ) {
      return res
        .status(401)
        .json(new Apiresponse(401, "Invalid token format", false, true));
    }

    if (token) {
      let validToken = await verifyJWT(token);
      if (validToken)
        return res
          .status(200)
          .json(new Apiresponse("200", "User Authorized", true, false));
    }

    return;
  } catch (error) {
    console.log(error, "In loggin skipper", false, true);
  }
};
export { userSignup, userLogin, userLogout, userLoginSkipper };
