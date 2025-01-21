import mongoose from "mongoose";

const ListSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        require:true
    },
    regularPrice:{
        type:Number,
        require:true
    },
    offerPrice:{
        type:Number,
        require:true
    },
    bathrooms:{
        type:Number,
        require:true
    },
    bedrooms:{
        type:Number,
        require:true
    },
    furnished:{
        type:Boolean,
        require:true
    },
    parkingSpot:{
        type:Boolean,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    offer:{
        type:String,
        require:true
    },
    imageUrls:{
        type:Array,
        require:true
    },
    userRef:{
        type:String,
        require:true
    }

},{timestamps:true})

const Listing = mongoose.model('Listing',ListSchema)

export default Listing