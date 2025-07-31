import express from 'express'
import Apiresponse from '../utils/Apiresponse.js'
import { userAuthentication } from '../middleware/tokenVerify.js'
const router = express.Router()

router.get('/protected',userAuthentication, (req, res) => {
res.status(200).json(new Apiresponse(200, 'Protected route accessed successfully', true, false, req.user))
})

export default router