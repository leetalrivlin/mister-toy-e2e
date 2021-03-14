const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {getToys,getToyById,saveToy,removeToy} = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
// router.get('/', log, getToys)
router.get('/:id', getToyById)
// router.get('/:id', log, getToyById)
router.post('/', saveToy)
// router.post('/:id?',  requireAuth, saveToy)
router.put('/:id?', saveToy)
// router.post('/:id?',  requireAuth, saveToy)
router.delete('/:id', removeToy)
// router.delete('/:id',  requireAuth, removeToy)

module.exports = router