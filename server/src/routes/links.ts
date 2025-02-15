import express from 'express'

import { getLink } from '../controllers/links/get-link'
import { listLinks } from '../controllers/links/list-links'
import { createLink } from '../controllers/links/create-link'
import { deleteLink } from '../controllers/links/delete-link'

const router = express.Router()

router.get('/', listLinks)
router.get('/:id', getLink)
router.post('/', createLink)
router.delete('/:id', deleteLink)

export default router
