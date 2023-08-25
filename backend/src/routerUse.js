const authRouter = require('./routers/auth')

exports.app_use = (app) => {
    app.use('/api/auth', authRouter)
}