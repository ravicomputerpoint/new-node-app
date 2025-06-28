const express = require('express')
const app = express()
const studentRouter =  require('./routes/students.route')

//Server Start
app.listen(3000,() => {
  console.log('Server Started Successfully')
})

//Application middleware
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use((req, res, next) => {
  res.locals.currentUrl = req.path;
  next();
});


//Use students route
app.use('/',studentRouter)
