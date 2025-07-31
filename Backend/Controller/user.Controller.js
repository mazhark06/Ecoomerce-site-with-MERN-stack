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
      }).cookie("refreshToken", refreshToken, {
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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(401)
        .json(new Apiresponse(401, "Please enter your credentials", false, true));
    }

    let userExist = await User.findOne({ email: email.toLowerCase() }).select("+password");
    
    if (!userExist) {
      return res
        .status(401)
        .json(new Apiresponse(401, "User not exist", false, true));
    }

    let isValidPass = await userExist.isMatchPassword(password);
    
    if (!isValidPass) {
      return res
        .status(401)
        .json(new Apiresponse(401, "Invalid credentials", false, true));
    }
    
    let accessToken = await generateAccessToken(userExist._id);
    let refreshToken = await generateRefreshToken(userExist._id);
    
    await User.findByIdAndUpdate(userExist._id, {
      refreshToken: refreshToken,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // false in development
      sameSite: 'lax',
      path: '/',
      domain: 'localhost' // Your domain
    };

    // Set cookies first, then send response
    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json(new Apiresponse(200, "Login successful", true, false, {
        accessToken,
        refreshToken
      }));

  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json(new Apiresponse(500, "Login failed", false, true, error.message));
  }
};

const userLogout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      refreshToken: null,
    });

    const cookieOptions = {
      httpOnly: true,
      secure: 'production',
      sameSite: 'Lax',
      path: '/'
    };

    return res
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .status(200)
      .json(new Apiresponse(200, "Logout successful", true, false));

  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json(new Apiresponse(500, "Logout failed", false, true, error.message));
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
