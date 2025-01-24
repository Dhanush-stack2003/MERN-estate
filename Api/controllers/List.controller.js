import Listing from "../models/Listing-model.js"
import { ErrorHandler } from "../utils/ErrorHandler.js";

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

export const deleteListing = async(req,res,next) => {
    const listing =await Listing.findById(req.params.id)

    if(!listing) return next(ErrorHandler(404, "listing not found"));

    if(req.user.id !== listing.userRef) return next(ErrorHandler(401,"you can delete your listing only"))

    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("listing deleted successfully")
    } catch (error) {
        next(error)
    }
}

export const updateListing = async (req,res,next) =>{
    const listing = await Listing.findById(req.params.id);

    if(!listing) return next(ErrorHandler(404,"listing no found"))

    if(req.user.id !== listing.userRef) return next(ErrorHandler(401,"you can delete your listing only"))

    try {
       const updatedList = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
       ) 
       res.status(200).json(updatedList)
    } catch (error) {
     next(error)
    }
}

export const GetListing = async(req,res,next) => {
    const listing = await Listing.findById(req.params.id)
    try{
    if(!listing) return next(ErrorHandler(404,"listing not found"))
    const list = await Listing.findById(req.params.id);
    res.status(200).json(list)
    }catch(error){
        next(error)
    }
}