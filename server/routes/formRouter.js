import express from 'express'
import auth from '../middlewares/auth.js'
import {formCtrl} from '../controllers/Form.js'

const {create, getForm, deleteForm, getFormsById, update, getSingleForm} = formCtrl

const router = express.Router()

router.post('/', auth, create)
router.get('/', auth, getForm)
router.delete('/delete_form/:id', auth, deleteForm)
router.get('/get_byId/:id', auth, getFormsById)
router.get('/get_form/:id', auth, getSingleForm)
router.patch('/edit_form/:id', auth, update)


export default router