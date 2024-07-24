const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/user.model.js');
const authRouter = require('./routes/auth.js')
const PORT =  process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(authRouter);

mongoose.connect('mongodb+srv://developerrohit0:Rohit9305@ecommerce.ow9oir5.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce')
.then((res)=>{
    console.log('Connected to database');
}).catch((e)=>{
    console.log('Error connecting to database',e);
});


app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})




// mongodb+srv://developerrohit0:Rohit9305@ecommerce.ow9oir5.mongodb.net/

// connection string

// mongodb+srv://developerrohit0:Rohit@9305$@ecommerce.ow9oir5.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce