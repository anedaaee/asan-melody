const passport = require('passport')
require('./middleware/passport')(passport)

const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const organRouter = require('./routers/organ')
const classRouter = require('./routers/class')
const purchaseRouter = require('./routers/purchase')
const userManagementRouter = require('./routers/userManagement')
const dashBoardRouter = require('./routers/dashboard')
const downloadRouter = require('./routers/download')

exports.app_use = (app) => {
    app.use('/api/auth' , authRouter)
    app.use('/api/user' ,passport.authenticate('jwt', { session: false }),userRouter)
    app.use('/api/organ' ,passport.authenticate('jwt', { session: false }),organRouter)
    app.use('/api/class' ,passport.authenticate('jwt', { session: false }),classRouter)
    app.use('/api/purchase' ,passport.authenticate('jwt', { session: false }),purchaseRouter)
    app.use('/api/userManagement' ,passport.authenticate('jwt', { session: false }),userManagementRouter)
    app.use('/api/dashboard' ,passport.authenticate('jwt', { session: false }),dashBoardRouter)
    app.use('/api/download' ,passport.authenticate('jwt', { session: false }),downloadRouter)
}