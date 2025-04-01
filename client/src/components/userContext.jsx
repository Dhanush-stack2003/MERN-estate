import React from 'react'

export const userContext = React.createContext();


const UserContextProvider = ({children}) => {
   const BackEndUrl = "https://mern-estate-k37d.onrender.com"

   const value={
    BackEndUrl
   }
   return <userContext.Provider value={value}>  
    {children}
   </userContext.Provider>
}

export default UserContextProvider

