import { useEffect, useState,useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import Listing from '../components/Listing';
import { userContext } from '../components/userContext';

export default function Search() {
  const Navigate = useNavigate();
  const [ sideBarListing,setSideBarListing ] = useState({
    searchTerm:'',
    type:'all',
    parkingSpot:false,
    furnished:false,
    offer:false,
    sort:'created_at',
    order:'desc'
  });
  const [listings,setListings] = useState([]);
  const [loading,setLoading] = useState(false);
  const [showMore,setShowMore] = useState(false);
  const { BackEndUrl } = useContext(userContext)
  
  
 useEffect(()=>{

  const paramsHandler = () =>{
    const urlParams = new URLSearchParams(location.search);
    const SearchTermfromurl = urlParams.get('searchTerm')
    const offerfromUrl = urlParams.get('offer')
    const typefromUrl = urlParams.get('type')
    const parkingfromUrl = urlParams.get('parkingSpot')
    const furnishfromUrl = urlParams.get('furnished')
    const sortfromUrl = urlParams.get('sort')
    const orderfromUrl = urlParams.get('order')

    if(SearchTermfromurl || offerfromUrl || typefromUrl || parkingfromUrl || furnishfromUrl || sortfromUrl || orderfromUrl){
      setSideBarListing({
        searchTerm:SearchTermfromurl || '',
        type: typefromUrl || 'all',
        parkingSpot: parkingfromUrl || sideBarListing.parkingSpot === 'true' ? true : false,
        furnished: furnishfromUrl || sideBarListing.furnished === 'true' ? true : false,
        offer : furnishfromUrl || sideBarListing.offer === 'true' ? true : false,
        sort: sortfromUrl || sideBarListing.sort || 'createdAt',
        order: orderfromUrl || sideBarListing.order || 'desc'
       })
    }
    const fetchListing = async () =>{
        setLoading(true)
        setShowMore(false);
        const paramUrl = urlParams.toString()
        const list = await fetch(`${BackEndUrl}/api/list/get?${paramUrl}`)
        const data = await list.json();
        if(data.length > 8){
          setShowMore(true)
        }
        else{
          setShowMore(false)
        }
        setListings(data)
        setLoading(false)
    }
    fetchListing()
  }
  paramsHandler()

 },[location.search])

  const handleSubmit = (e) => {
    if(e.target.id === 'searchTerm'){
      setSideBarListing({...sideBarListing,searchTerm:e.target.value})
    }

    if(e.target.id === 'all' || e.target.id === 'sell' || e.target.id === 'rent'){
      setSideBarListing({...sideBarListing,type:e.target.id})
    }


    if(e.target.id === 'parkingSpot' || e.target.id === 'furnished' || e.target.id === 'offer'){
      setSideBarListing({...sideBarListing,[e.target.id]:e.target.checked || e.target.checked === 'true' ? true : false})
    }

    if(e.target.id === 'sort_order'){
      const sort = e.target.value.split('_')[0] || 'created_At';

      const order = e.target.value.split('_')[1] || 'desc';

      setSideBarListing({...sideBarListing,sort,order})
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
       const urlParams = new URLSearchParams();
       urlParams.set("searchTerm", sideBarListing.searchTerm);
       urlParams.set("offer", sideBarListing.offer);
       urlParams.set("parkingSpot", sideBarListing.parkingSpot);
       urlParams.set("furnished", sideBarListing.furnished);
       urlParams.set("type", sideBarListing.type);
       urlParams.set("sort", sideBarListing.sort);
       urlParams.set("order", sideBarListing.order);
        Navigate(`/search?${urlParams}`)
  }

  const handleShowMore = async () => {
    const urlParams = new URLSearchParams(location.search);
    const startIndex = listings.length;
    urlParams.set('startIndex',startIndex)
    const showMore = urlParams.toString()
    const listMore = await fetch(`${BackEndUrl}/api/list/get?${showMore}`)
    const data = await listMore.json();
    sideBarListing.searchTerm = "";
    if(listings.length <= 9){
      setShowMore(false)
    }
     setListings([...listings,...data])
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:max-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleFormSubmit}>
          <div className="flex gap-2 items-center">
            <label htmlFor="type" className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              id="searchTerm"
              type="text"
              placeholder="Enter the Title here..."
              className="w-full p-3 rounded-lg"
              onChange={handleSubmit}
              value={sideBarListing.searchTerm}
            />
          </div>
          <div className="flex gap-4 flex-wrap">
            <label className="font-semibold">Type:</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="all"
                className="h-5 w-4"
                onChange={handleSubmit}
                checked={sideBarListing.type === "all"}
              />
              <span>Rent & Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-4 h-5"
                checked={sideBarListing.type === "rent"}
                onChange={handleSubmit}
              />
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-4 h-5"
                checked={sideBarListing.type === "sell"}
                onChange={handleSubmit}
              />
              <span>Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Offer</span>
              <input
                type="checkbox"
                id="offer"
                className="w-4 h-5"
                checked={sideBarListing.offer}
                onChange={handleSubmit}
              />
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex items-center gap-2">
              <span>Parking</span>
              <input
                type="checkbox"
                id="parkingSpot"
                className="w-4 h-5"
                checked={sideBarListing.parkingSpot}
                onChange={handleSubmit}
              />
            </div>
            <div className="flex items-center gap-2">
              <span>Furnish</span>
              <input
                type="checkbox"
                id="furnished"
                className="w-4 h-5"
                checked={sideBarListing.furnished}
                onChange={handleSubmit}
              />
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <label className="font-semibold">Order:</label>
            <select
              id="sort_order"
              className="p-3 rounded-lg"
              defaultValue="createdAt_desc"
              onChange={handleSubmit}
            >
              <option value="regularPrice_asc">Price low to high</option>
              <option value="regularPrice_desc"> price high to low</option>
              <option value="createdAt_desc"> Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-90">
            Submit
          </button>
        </form>
      </div>
      <div className="p-7">
        <h1 className="text-3xl font-semibold">Listing Details</h1>
        <div className="mx-auto">
          <div className='flex gap-4'>
            {listings.length === 0 && !loading && <p className='text-xl font-semibold'>No Listing Found</p>}
            {loading && <p className='text-xl font-semibold'>Loading...</p>}
          </div>
          <div className='flex flex-wrap'>
            {listings && listings.map((listingItems)=> <Listing key={listingItems._id} listing={listingItems} />)}
          </div>
          <div>
            {showMore && <p className='text-green-700 hover:underline text-center cursor-pointer' onClick={handleShowMore}>Show More</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
