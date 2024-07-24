const mongoos = require('mongoose')

const userScheme = new mongoos.Schema({
    name : {
       type : String,
       required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        validate : {
           validator : (value) => {
              // regx => regular expression 
              const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              return value.match(re);
           },
           // if email is not correct then message get
           message : 'please enter valid email address'
        }
    },
    password : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        default : "",
    },
    type : {
        type : String,
        default : "user",
    }
});

const User =  mongoos.model('User', userScheme);
module.exports = User;