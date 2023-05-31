import express from 'express'
import auth from '../middlewares/auth.js'
import {designCtrl} from '../controllers/Design.js'

const {create, getDesign, getDesignById} = designCtrl

const router = express.Router()

router.post('/', auth, create)
router.get('/', auth, getDesign)
router.get('/:id', auth, getDesignById)


export default router