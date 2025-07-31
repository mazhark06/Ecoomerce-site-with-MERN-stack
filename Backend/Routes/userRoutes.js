import upload from "../utils/multer.js";
import express from 'express'
import { userLogin , userLogout, userSignup ,userLoginSkipper} from '../Controller/user.Controller.js'
import { userAuthentication } from "../middleware/tokenVerify.js";

const router = express.Router()


router.post('/signup',userSignup)

router.post('/login', userLogin)

router.get('/authChecker' , userLoginSkipper)

router.get('/logut',userAuthentication,userLogout)
export default router