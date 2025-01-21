import Listing from "../models/Listing-model.js"

export const ShowListing =async (req,res,next) => {
    try {
          const list = await Listing.create(req.body);
          res.status(201).json(list);  
    } catch (error) {
        console.log(error.message)
        console.log("please upload inputs")
       next(error)  
    }
}