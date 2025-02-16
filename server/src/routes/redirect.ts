import express from 'express'
import { redirectLink } from '../controllers/redirect/redirect-link'

const router = express.Router()

router.get('/:id', redirectLink)

export default router
