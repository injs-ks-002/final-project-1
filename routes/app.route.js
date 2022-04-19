const express = require('express')
const router = express.Router()
const {
    verify
} = require('../middleware/authentication')
const controllerUser = require('../controllers/user.controller')
const {
    getReflectionUser,
    userLogin,
    postReflectionUser,
    putReflectionUser,
    deleteReflectionUser
} = require('../controllers/reflection.controller')

router.post('/api/v1/users/register', controllerUser.signup);
router.post('/api/v1/users/login', controllerUser.signIn);
//router.post('/api/v1/users/login', userLogin)
router.post('/api/v1/reflections', verify, postReflectionUser)
router.get('/api/v1/reflections', verify, getReflectionUser)
router.put('/api/v1/reflections/:id', verify, putReflectionUser)
router.delete('/api/v1/reflections/:id', verify, deleteReflectionUser)

module.exports = router