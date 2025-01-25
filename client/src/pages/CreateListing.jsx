import React, { useState } from "react";
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router'

export default function CreateListing() {
  const {currentUser} = useSelector((state)=>state.user);
  const navigate = useNavigate()
  const [file, setFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUploadError,setImageUploadError] = useState(null)
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    imageUrls: [],
    username: "",
    address: "",
    description: "",
    type: "sell",
    parkingSpot: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    offerPrice: 0,
    userRef:""
  });
  const formStorage = new FormData();
  let promises = [];


  const uploadHandler = async (e) => {
    try {
     if(file.length > 0 && file.length < 7){
      setLoading(true);
      setError(null)
      for (let i = 0; i < file.length; i++) {
        formStorage.append("file", file[i]);
        formStorage.append("upload_preset", "MERN_Estate");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dqybneibc/image/upload",
        {
          method: "POST",
          body: formStorage,
        }
      );
      if (!res) return console.log(res.message);
      const data = await res.json();
      promises.push(data.url);
      if(promises.length > 0){
        setFormData({...formData,imageUrls:formData.imageUrls.concat(promises)})
      }
      setLoading(false)
    }}else{
      setLoading(false)
      setImageUploadError("user must upload atleast 1 image")
    }} catch (error) {
      setLoading(false);
      setImageUploadError("image size must be under(2mb)")
    }
  };

  const deleteImageHandler = (index) => {
    setFormData({
      ...formData,
      imageUrl:formData.imageUrls.filter((url,id)=>id !== index)
    })
  }

  const changeHandler = (e) => {
    if (e.target.id === "sell" || e.target.id === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "parkingSpot" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const submitFormHandler =async (e) => {
    e.preventDefault();
    if (file.length < 0) return setError("please upload atleast 1 images for submission.");
    if(+formData.offerPrice > +formData.regularPrice) return setError("Offer price must be less than Regular price")
    try {
      setLoading(true);
      const list = await fetch('/api/list/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({...formData,userRef:currentUser._id})
      })
      setLoading(false);
      const data = await list.json()      
      if(data.success === false) return setError("unable to process,please provide the valid information")
       console.log(data)
       navigate(`/listings/${data._id}`)
    } catch (error) {
      setLoading(false);
      setError("please provide the require information");
    }
  };

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
              id="username"
              className="border rounded-lg p-3"
              onChange={changeHandler}
              value={formData.username}
              required
            />
            <textarea
              placeholder="description"
              id="description"
              className="border rounded-lg p-3"
              onChange={changeHandler}
              value={formData.description}
              required
            />
            <input
              placeholder="address"
              id="address"
              className="border rounded-lg p-3"
              onChange={changeHandler}
              value={formData.address}
              required
            />
          </div>
          <div className="flex gap-5 my-4 flex-1 flex-wrap">
            <div className="flex gap-1">
              <input
                type="checkbox"
                className="w-4"
                id="sell"
                onChange={changeHandler}
                checked={formData.type === "sell"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                className="w-4"
                id="rent"
                onChange={changeHandler}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                className="w-4"
                id="furnished"
                onChange={changeHandler}
                checked={formData.furnished}
              />
              <span>furnished</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                className="w-4"
                id="parkingSpot"
                onChange={changeHandler}
                checked={formData.parkingSpot}
              />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-4"
                onChange={changeHandler}
                checked={formData.offer}
              />
              <span>Offer</span>
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
                onChange={changeHandler}
                value={formData.bedrooms}
              />
              <span>Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 text-center border rounded-lg border-gray-300"
                min="1"
                max="10"
                id="bathrooms"
                onChange={changeHandler}
                value={formData.bathrooms}
              />
              <span>Baths</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 ">
              <input
                type="number"
                min="50"
                max="100000"
                className="p-2 border text-center border-gray-300 rounded-lg"
                id="regularPrice"
                onChange={changeHandler}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <span>Regular Price</span>
                <span className="font-light">($/Month)</span>
              </div>
            </div>

           {formData.offer && <div className="flex gap-2 ">
              <input
                type="number"
                id="offerPrice"
                min="0"
                max="100000"
                className="p-2 border border-gray-300 rounded-lg text-center"
                onChange={changeHandler}
                value={formData.offerPrice}
              />
              <div className="flex flex-col items-center">
                <span>Discounted Price</span>
                <span className="font-light">($/Month)</span>
              </div>
            </div>}
          </div> 
        </form>
        <form className="p-5">
          <div>
            <div className="flex gap-1">
              <span className="font-semibold">Images:</span>
              <span className="font-normal text-slate-700">
                The first image will be the cover (max 6)
              </span>
            </div>
            <div className="flex my-4 gap-4">
              <input
                type="file"
                id="fileUpload"
                onChange={(e) => {
                  return setFile(e.target.files);
                }}
                className="border p-3 w-full"
                accept="images/*"
                multiple
              />
              <button
                className="text-green-700 border rounded p-3 border-green-700 uppercase"
                type="button"
                onClick={uploadHandler}
              >
                {loading ? "uploading..." : "Upload"}
              </button>
            </div>
            <div>
              {formData.imageUrls.length > 0 &&
                formData.imageUrls.map((url, id) => {
                  return (
                    <div className='flex justify-between' key={id}>
                    <img
                      src={url[0]}
                      alt="profile"
                      key={id}
                      className="object-cover rounded-lg h-15 w-40 my-2 uppercase hover:opacity-90"
                    />
                    <button type="button" className='text-red-700' onClick={()=>deleteImageHandler(id)}>Delete</button>
                    </div>
                  );
                })}
            <button
              disabled={loading}
              className="bg-slate-700 text-white border p-3 my-3 w-full rounded-lg uppercase text-center hover:opacity-90 disabled:opacity-80" onClick={submitFormHandler}
            >
              {loading ? "uploading" : "Create Listing"}
            </button>
            </div>
        {imageUploadError && <p className="text-red-600 my-2">{imageUploadError}</p>}
        {error && <p className="text-red-600 my-2">{error}</p>}
          </div>
        </form>
      </div>
    </main>
  );
}
