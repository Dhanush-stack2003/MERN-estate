import React from 'react'

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 max-h-screen">
        <form className="flex flex-col gap-8">
          <div className="flex gap-2 items-center">
            <label htmlFor="type" className="font-semibold">
              Title:
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter the Title here..."
              className="w-full p-3 rounded-lg"
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <label className="font-semibold">Type:</label>
            <div className="flex items-center gap-2">
              <label>Rent & Sell</label>
              <input type="checkbox" id="all" className="h-5 w-4" />
            </div>
            <div className="flex items-center gap-2">
              <label>Rent</label>
              <input type="checkbox" id="rent" className="w-4 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <label>Sell</label>
              <input type="checkbox" id="sell" className="w-4 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <label>Offer</label>
              <input type="checkbox" id="offer" className="w-4 h-5" />
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex items-center gap-2">
              <label>Parking</label>
              <input type="checkbox" id="parkingSpot" className="w-4 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <label>Furnish</label>
              <input type="checkbox" id="furnished" className="w-4 h-5" />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold">Order:</label>
            <select id="order" className="p-3 rounded-lg">
              <option id="High cost to low cost">High cost to low cost</option>
              <option id="Low cost to high cost">Low cost to high cost</option>
              <option id="Latest">Latest</option>
              <option id="Oldest">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-90">
            Submit
          </button>
        </form>
      </div>
      <div className="p-7">
        <h1 className="text-3xl font-semibold">Listing Details</h1>
      </div>
    </div>
  );
}
