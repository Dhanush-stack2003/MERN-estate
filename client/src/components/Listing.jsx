import React from 'react'
import {MdLocationOn} from 'react-icons/md'
import { Link } from 'react-router-dom';

export default function Listing({listing}) {
  return (
      <div className="bg-white m-5 max-w-[270px] rounded-lg transition-shadow shadow-md hover:sm:shadow-lg overflow-hidden sm:h-[330px]">
          <Link to={`/listing/${listing._id}`}>
        {listing && (
          <img
            src={listing.imageUrls[0]}
            alt="listing cover"
            className="h-[220px] sm:h-[170px] w-full  hover:scale-105 transistion-scale duration-300 object-cover"
          />
        )}
        <div className="flex gap-2 flex-col w-full p-3">
          <p className="text-lg text-slate-700 font-semibold truncate">
            {listing.username}
          </p>
          <div className="flex gap-1 items-center">
            <MdLocationOn className="text-green-700 h-4 w-4" />
            <p className="text-sm text-gray-600 truncate md:line-clamp-2">
              {listing.address}
            </p>
          </div>
          <p className="text-gray-600 text-sm truncate">
            {listing.description}
          </p>
          <p className="text-slate-500 font-semibold">
            $
            {listing.offer
              ? listing.offerPrice.toLocaleString("en-us")
              : listing.regularPrice.toLocaleString("en-us")}
            {listing.type === "rent" && " /month"}
          </p>
          <div className="flex gap-4 text-slate-700 ">
            <div className="text-xs font-bold">
              <p>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </p>
            </div>
            <div className="text-xs font-bold">
              <p>
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </p>
            </div>
          </div>
        </div>
    </Link>
      </div>
  );
}
