const mongoose = require('mongoose');

const DeveloperSchema  = mongoose.Schema({

        api_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"API",
            required: true,
        },
        api_key: {
            type: String,
            required: true,
        },
        userid:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        call:{
            type: Number,
            required: false,
        }
},
{
    timestamps: true,
}
);


const API = mongoose.model('developer', DeveloperSchema)

module.exports = API

        
