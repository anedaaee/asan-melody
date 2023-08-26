const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const organRouter = require('./routers/organ')
exports.app_use = (app) => {
    app.use('/api/user' ,userRouter)
    app.use('/api/auth', authRouter)
}