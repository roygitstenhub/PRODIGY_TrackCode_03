import express from  "express"
import { Register,Login,Profile, Logout} from "../controllers/auth.js"
import verifyToken from "../middleware/verifyToken.js"

const router= express.Router()

router.post('/register',Register)
router.post('/login',Login)
router.get('/profile/:id',verifyToken,Profile)
router.get('/logout',Logout)


export default router