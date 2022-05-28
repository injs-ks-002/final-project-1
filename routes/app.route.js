const express = require('express')
const router = express.Router()
const {verify} = require('../middleware/authentication')
const controllerUser = require('../controllers/user.controller')
const {
    getReflectionUser,
    postReflectionUser,
    putReflectionUser,
    deleteReflectionUser
} = require('../controllers/reflection.controller')
const reflection = require('../middleware/reflection.validation')
const user = require('../middleware/user.validation')

router.post('/api/v1/users/register', user.validation, controllerUser.signup);
router.post('/api/v1/users/login', user.validation, controllerUser.signIn);
router.post('/api/v1/reflections', verify, reflection.validation, postReflectionUser)
router.get('/api/v1/reflections', verify, getReflectionUser)
router.put('/api/v1/reflections/:id', verify, reflection.validation, putReflectionUser)
router.delete('/api/v1/reflections/:id', verify, deleteReflectionUser)

module.exports = router