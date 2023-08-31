const mongoose = require('mongoose');
// const bcrypt = require( 'bcryptjs');

const apiSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      endpoint: {
        type: String,
        required: true,
      },
      userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }
},
    {
        timestamps: true,
    }
)

const API = mongoose.model('Marketplace', apiSchema)

module.exports = API