import express from 'express'
import {userCtrl} from '../controllers/User.js'
import auth from '../middlewares/auth.js'
import authAdmin from '../middlewares/authAdmin.js'

const router = express.Router()

router.post('/register', userCtrl.register)

router.post('/activation', userCtrl.activateEmail)

router.post('/login', userCtrl.login)

router.post('/refresh_token', userCtrl.getAccessToken)

router.post('/forgot', userCtrl.forgotPassword)

router.post('/reset', userCtrl.resetPassword)

router.get('/user_info', auth, userCtrl.getUserInfor)

router.get('/user_all_info', auth, userCtrl.getUsersAllInfor)

router.get('/logout', userCtrl.logout)

router.patch('/update', auth, userCtrl.updateUser)

router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)

router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

router.get("/logout", userCtrl.logout)

router.post("/create_user", auth, authAdmin, userCtrl.adminUser)

export default router