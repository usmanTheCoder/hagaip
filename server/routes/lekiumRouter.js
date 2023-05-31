import express from 'express'
import auth from '../middlewares/auth.js'
import {lekiumCtrl} from '../controllers/Lekium.js'

const {create, getLekium, getChaps, getSubChaps, getById, getLekiumImage} = lekiumCtrl

const router = express.Router()

router.post('/', auth, create)
router.get('/', auth, getLekium)
router.get('/get_chaps', auth, getChaps)
router.get('/get_subChaps/:chapterName', auth, getSubChaps)
router.get('/getId_lekium', auth, getById)
router.get('/get_lekiumImg', auth, getLekiumImage)


export default router