import { useState,useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import { Navigation,Pagination } from 'swiper/modules'
import 'swiper/css/bundle'
import "swiper/css/pagination";
import Listing from '../components/Listing'
import { userContext } from '../components/userContext'

export default function Home() {
  const [offerListing,setOfferListing] = useState([]);
  const [rentListing,setRentListing] = useState([]);
  const [sellListing,setSellListing] = useState([]);
  const { BackEndUrl } = useContext(userContext)

  useEffect(()=>{
    const fetchListing = async () => {
      try{
      const getListing = await fetch(`${BackEndUrl}/api/list/get?offer=true&limit=4`)
      const getListingData = await getListing.json();
      setOfferListing(getListingData)
      fetchRentListing()
      }catch(error){
        console.log(error.message)
      }
    }
    const fetchRentListing = async () => {
      try{
      const getRentListing = await fetch(`${BackEndUrl}/api/list/get?type=rent&limit=4`)
      const rentListingData = await getRentListing.json();
      setRentListing(rentListingData)
      fetchSellListing()
      }catch(error){
        console.log(error.message)
      }
    }
    const fetchSellListing = async () => {
      try {
        const getSellListing = await fetch(`${BackEndUrl}/api/list/get?type=sell&order=asc&limit=4`)
        const sellListingData = await getSellListing.json();
        setSellListing(sellListingData)
      } catch (error) {
        console.log(error.message)
      }
    }
     fetchListing()
  },[])

  return (
    <div>
      {/* starter */}
      <div className="flex flex-col gap-3 p-6 py-20 mx-auto">
        <h1 className="text-slate-600 text-3xl lg:text-6xl font-bold">
          Find your Dream
          <span className="text-slate-800 fontbold"> Perfect</span>
          <br />
          Place with Ease
        </h1>
        <Link
          to={"/search"}
          className="text-blue-800 text-xs lg:text-sm hover:underline"
        >
          Let's get started..
        </Link>
      </div>

      {/* slider */}
      <Swiper modules={[Navigation,Pagination]} navigation pagination={{clickable:true}} slidesPerView={1}>
        {rentListing &&
          rentListing.length > 0 &&
          rentListing.map((listing) => {
            return (
              <SwiperSlide key={listing._id}>
                <img
                  key={listing._id}
                  className="max-[width]:400px"
                  style={{
                    background: `url(${listing.imageUrls[0]}) w-full no-repeat center`,
                    backgroundSize: "object-cover",
                  }}
                  src={listing.imageUrls[0]}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* list of offers */}
      <div className="flex flex-col max-w-6xl mx-auto p-3 gap-8 my-10">
      {offerListing && offerListing.length > 0 && (
        <div className="">
          <div className="my-3 mx-5">
            <h2 className="text-2xl  text-slate-700">
              Popular offers
            </h2>
            <Link to={`/search?offer=true`} className="text-blue-700 text-xs lg:text-sm">
              Explore more offer
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            {
              offerListing.length > 0 &&
              offerListing.map((listing) => {
                return <Listing key={listing._id} listing={listing} />;
              })}
          </div>
        </div>
        ) }

        {offerListing && offerListing.length > 0 && (
        <div className="flex flex-wrap my-5">
          <div>
            <div className="my-3 mx-5">
              <h2 className="text-2xl text-slate-700 font-semibold">
                Popular rent plans
              </h2>
              <Link to={`/search?type=rent`} className="text-blue-700 text-sm hover:underline">
                Explore more rent plans
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {
                rentListing.length > 0 &&
                rentListing.map((listing) => {
                  return <Listing key={listing._id} listing={listing} />;
                })}
            </div>
          </div>
        </div>
        ) }

        {sellListing && sellListing.length > 0 && (
          <div className="flex flex-wrap my-5">
          <div>
            <div className="my-3 mx-5">
              <h2 className="text-2xl text-slate-700 font-semibold">
                Popular sale plans
              </h2>
              <Link to={`/search?type=sell`} className="text-blue-700 text-sm hover:underline">
                Explore more sell plans
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {
              sellListing.length > 0 &&
              sellListing.map((listing) => {
                return <Listing key={listing._id} listing={listing} />;
              })}
          </div>
        </div>   
) }
      </div>
    </div>
  );
}
