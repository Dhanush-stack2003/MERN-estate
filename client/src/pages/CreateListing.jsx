import React from 'react'

export default function CreateListing() {
  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-slate-700 font-semibold text-3xl text-center my-7">
        Create Listing
      </h1>
      <div className="flex flex-col sm:flex-row">
        <form className="p-5">
          <div className="flex flex-col gap-5">
            <input
              placeholder="name"
              id="name"
              className="border rounded-lg p-3"
            />
            <textarea
              placeholder="description"
              id="description"
              className="border rounded-lg p-3"
            />
            <input
              placeholder="address"
              id="address"
              className="border rounded-lg p-3"
            />
          </div>
          <div className="flex gap-5 my-4 flex-1 flex-wrap">
            <div className="flex gap-1">
              <input type="checkbox" className='w-4' id="sell" />
              <span>Sell</span>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" className='w-4' id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" className='w-4' id="furnished" />
              <span>furnished</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" className='w-4' id="parkingSpot" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="offer" className='w-4'/>
              <span> Offer</span>
            </div>
          </div>
          <div className="flex gap-3 my-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                className="p-3 text-center border rounded-lg border-gray-300"
                id="bedrooms"
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                className="p-3 text-center border rounded-lg border-gray-300"
                id="bathrooms"
              />
              <span>Baths</span>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <div className='flex gap-2 '>
              <input type="number" className="p-2 border text-center border-gray-300 rounded-lg" id="regularPrice" />
              <div className="flex flex-col items-center">
                <span>Regular Price</span>
                <span className='font-light'>($/Month)</span>
              </div>
            </div>
            <div className='flex gap-2 '>
              <input type="number" id="offerPrice" className='p-2 border border-gray-300 rounded-lg text-center' />
              <div className="flex flex-col items-center">
                <span>Discounted Price</span>
                <span className='font-light'>($/Month)</span>
              </div>
            </div>
          </div>
        </form>
        <form className='p-5'>
          <div>
            <div className="flex gap-1">
              <span className="font-semibold">Images:</span>
              <span className="font-normal text-slate-700">
                The first image will be the cover (max 6)
              </span>
            </div>
            <div className='flex my-4 gap-4'>
              <input type='file' id='fileUpload' className='border p-3 w-full'/>
              <button className='text-green-700 border rounded p-3 border-green-700 uppercase'>Upload</button>
            </div>
            <button className='bg-slate-700 text-white border p-3 w-full rounded-lg uppercase text-center'>Create Listing</button>
          </div>
        </form>
      </div>
    </main>
  );
}
