import {useEffect,useState} from 'react'
import { FaBath, FaBed, FaParking, FaShare, FaTable } from 'react-icons/fa';
import {Swiper,SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/swiper-bundle.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Contact from './Contact';

export default function Listing() {
    SwiperCore.use([Navigation])
    const [error,setError] = useState(false);
    const [listing,setListing] = useState([]);
    const [loading,setLoading] = useState(false);
    const [copied,setCopied] = useState(false);
    const [contact,setContact] = useState(false);
    const { currentUser }  = useSelector((state)=>state.user)
    const params = useParams();

    useEffect(()=>{
     const fetchListing = async() => {
        setLoading(true)
        const list = await fetch(`/api/list/get/${params.ListingId}`)
        if(!list) return setError(list.message)
        const data = await list.json();
        if(data.success === false){
            setLoading(false);
            setError("listing not available")
        }
        setLoading(false)
        setListing(data)
    }
     fetchListing()
},[params.ListingId])

  return (
    <main>
      {loading && (
        <p className="text-slate-700 text-center text-2xl">Loading...</p>
      )}
      {error && <p className="text-red-600 text-center text-2xl">{error}</p>}
      {listing && !loading && !error && (
        <div className="gap-4">
          {/* <Swiper navigation>
            {listing.imageUrls.length > 0 && listing.imageUrls.map((url) => (
                 <SwiperSlide key={url}> 
                    <img
                      src={url}
                      alt="estate"
                      className="max-[width]:500px"
                      style={{
                        background: `url${url} w-full center no-repeat`,
                        backgroundSize: "object-cover",
                      }}
                    />
                  </SwiperSlide>
              ))}
      </Swiper> */}
          <div>
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link Copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto gap-6 my-6">
            <p className="font-semibold text-2xl text-slate-600 my-3">
              {listing.username} - $ {listing.regularPrice} / month
            </p>
            <p className="flex items-center mt-3 gap-6 text-slate-700 text-sm">
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="text-white bg-red-700 w-full p-2 rounded-md text-center max-w-[200px]">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="text-white bg-green-700 text-center p-2 rounded-md w-full max-w-[200px]">{`$ ${
                  +listing.regularPrice - +listing.offerPrice
                } Discount`}</p>
              )}
            </div>
            <p className="text-slate-700">
              <span className="font-semibold text-black">Description -</span>
              {listing.description}
            </p>
            <ul className="flex gap-5 flex-wrap text-green-900 font-semibold text-sm">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBath color="green" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaBed color="green" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking color="green" />
                {listing.parking ? "No Parking" : "Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaTable color="green" />
                {listing.furnished ? "Furnished" : "Not Furnished"}
              </li>
            </ul>
            {currentUser._id !== listing.userRef && !contact && (
              <button
                className="bg-slate-700 text-white  p-3 rounded-lg uppercase hover:opacity-90 w-full"
                onClick={() => setContact(true)}
              >
                Contact Landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
}
