import {useContext, useEffect,useState} from 'react'
import { FaBath, FaBed, FaParking, FaTable } from 'react-icons/fa';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css'
import { Navigation,Pagination } from 'swiper/modules'
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Contact from './Contact';
import { userContext } from '../components/userContext';

export default function Listing() {
    const [error,setError] = useState(false);
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [contact,setContact] = useState(false);
    const [propertyImage,setPropertyImage] = useState([]);
    const { currentUser }  = useSelector((state)=>state.user)
    const params = useParams();
    const { BackEndUrl } = useContext(userContext)

    useEffect(()=>{
     const fetchListing = async() => {
        setLoading(true)
        const list = await fetch(`${BackEndUrl}/api/list/get/${params.ListingId}`)
        if(!list) return setError(list.message)
        const data = await list.json();
        if(data.success === false){
            setLoading(false);
            setError("listing not available")
        }
        setListing(data)
        const {imageUrls} = data;
        for(let i=0;i<imageUrls.length;i++){
         propertyImage.push(...imageUrls)
       }
        setLoading(false)
      }
      fetchListing()
    },[params.ListingId])
    

  return (
    <main className="p-3">
      {loading && (
        <p className="text-slate-700 text-center text-2xl">Loading...</p>
      )}
      {error && <p className="text-red-600 text-center text-2xl">{error}</p>}
      <div className="text-center">
      </div>
      {listing && !loading && !error && (
        <div>
          <div>
            <div>
              <Swiper
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                navigation
                className="myswiper"
              >
                {propertyImage.length > 0 &&
                  propertyImage.map((url, id) => {
                    return <SwiperSlide key={id}>
                      <img
                        src={url}
                        className="w-full"
                        alt="property img"
                        style={{
                          background: `url(${url}) w-full no-repeat center`,
                          backgroundSize: "cover",
                        }}
                      />
                    </SwiperSlide>;
                  })}
              </Swiper>
            </div>
            <div className="flex flex-col max-w-4xl mx-auto gap-5 my-4">
              <p className="font-semibold text-2xl text-slate-600 my-3">
                {listing.username} - ${listing.regularPrice} / month
              </p>
              <p className="flex items-center mt-3 gap-6 text-slate-700 text-sm">
                {listing.address}
              </p>
              <div className="flex gap-4">
                <p className="text-white bg-red-700 w-full p-2 rounded-md text-center max-w-[200px]">
                  {listing.type === "rent" ? "For Rent" : "For Sale"}
                </p>
                {listing.offer && (
                  <p className="text-white bg-green-700 text-center p-2 rounded-md w-full max-w-[200px]">{`$ ${(
                    +listing.regularPrice - +listing.offerPrice
                  ).toLocaleString("en-us")} Discount`}</p>
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
                  className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 w-full"
                  onClick={() => setContact(true)}
                >
                  Contact Landlord
                </button>
              )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
