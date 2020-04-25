const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 5000;
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(userRoute);
app.use('/admin', adminRoute);

app.listen(process.env.PORT || port, function(){
    console.log("Server has started.");
});