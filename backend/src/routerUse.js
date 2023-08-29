const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const organRouter = require('./routers/organ')
const classRouter = require('./routers/class')
const purchaseRouter = require('./controller/purchaseCtrl')
exports.app_use = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user' ,userRouter)
    app.use('/api/organ' ,organRouter)
    app.use('/api/class' ,classRouter)
    app.use('/api/class' ,purchaseRouter)
}