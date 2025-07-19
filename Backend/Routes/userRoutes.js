import upload from "../utils/multer.js";
import express from 'express'
import { userLogin , userSignup} from '../Controller/user.Controller.js'

const router = express.Router()


router.post('/signup',userSignup)

router.get('/login', upload.none(),userLogin)



export default router