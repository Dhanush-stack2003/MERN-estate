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
    const list = await Listing.find({userRef:req.params.id})
    res.status(200).json(list)     
    } catch (error) {
        console.log(error.message)
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

export const GetSearchListing = async (req,res,next) => {
    try {
        const searchTerm = req.query.searchTerm || '';
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startindex) || 0;
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        let parkingSpot = req.query.parkingSpot;
        if(parkingSpot === undefined || parkingSpot === 'false'){
            parkingSpot={$in:[false,true]}
        }
        let furnished = req.query.furnished;
        if(furnished === undefined || furnished === 'false'){
            furnished = {$in:[false,true]}
        }
        let type = req.query.type;
        if(type === undefined || type === 'all'){
            type={$in:['sale','rent']}
        }
        let offer = req.query.offer;
        if(offer === undefined || offer === 'false'){
            offer={$in:[false,true]}
        }
        const listing = await Listing.find({
          username:{$regex:searchTerm.toString(),$options:'i'},
          parkingSpot,
          furnished,
          type
        })
          .sort({ [sort]: order })
          .limit(limit)
          .skip(startIndex);
          res.status(200).json(listing)
    } catch (error) {
        next(error)
        console.log(error)
    }
}