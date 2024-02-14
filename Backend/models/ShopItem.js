const mongoose = require('mongoose');
const { Schema } = mongoose;

// This is model for ShopItem s
const ShopItemSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now()
    },
    manuDate:{
        type: Date,
        required: true
    },
    expDate:{
        type: Date,
    },
    mrp:{
        type: Number,
    },
    sp:{
        type: Number,
        required: true
    },
    itemImg:{
        type: String,
        default: "shop/default.png"
    }
})

const ShopItem = mongoose.model('shopitem', ShopItemSchema);
ShopItem.createIndexes();
module.exports = ShopItem;