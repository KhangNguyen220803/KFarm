import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()
const Router = (app) => {
    
    router.post('/register', userController.insertacc)
    router.post('/login', userController.login)


    return app.use('/', router)
}

export default Router
