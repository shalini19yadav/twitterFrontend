import React, { useState } from 'react'
import UserContext from './UserContext'

const UserState = (props) => {

  let userData =JSON.parse(localStorage.getItem('socialDetails'))
   
  const [details, setdetails] = useState({
        login:userData? userData.login : false,
        token: userData? userData.token : ""
    });

    console.log(details)

  return (
    <UserContext.Provider value={{details, setdetails}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
