const mongoose = require("mongoose")

const userScheme = mongoose.Schema({ 
    "mobile" : {
        type : Number,
        required : true ,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v.toString());
            },
            message: props => `${props.value} is not a valid 10-digit mobile number!`
        }
    },

    "otp" : {
      type : Number,
      required : true,
    },

    "otpcount" : {
        type : Number,
        default : 0
    },

    "blockedUser" : {
       type : Boolean,
       default : false
    }

}, {timestamps : true})

module.exports = mongoose.model('User2' , userScheme);

