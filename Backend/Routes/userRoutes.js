import upload from "../utils/multer.js";
import express from 'express'
import { userAuthchecker, userLogin , userSignup} from '../Controller/user.Controller.js'
import { userAuthentication } from "../middleware/tokenVerify.js";
import userLoginSkipper from "../middleware/lognSkipper.js";

const router = express.Router()


router.post('/signup',userSignup)

router.post('/login', userLogin)

router.get('/authChecker' , userLoginSkipper)
export default router