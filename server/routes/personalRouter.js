import express from 'express'
import auth from '../middlewares/auth.js'
import {personalCtrl} from '../controllers/Personal.js'

const {createPersonal, get, getPersonalById} = personalCtrl

const router = express.Router()

router.post('/', auth, createPersonal)
router.get('/', auth, get)
router.get('/:id', auth, getPersonalById)


export default router