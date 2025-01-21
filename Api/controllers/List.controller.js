import Listing from "../models/Listing-model.js"

export const CreateListing =async (req,res,next) => {
    try {
          const list = await Listing.create(req.body);
          res.status(201).json(list);  
    } catch (error) {
        console.log(error.message)
       next(error)  
    }
}

export const ShowListing = async (req,res,next) => {
    try {
        if(req.user.id === req.params.id){
            const list = await Listing.find({userRef:req.params.id})
            res.status(200).json(list)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
}