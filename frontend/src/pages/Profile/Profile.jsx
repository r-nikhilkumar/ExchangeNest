import React, { useEffect, useState } from 'react'
import ProfileLayout from './ProfileLayout'

function Profile() {
    const [data, setData] = useState(null)
    useEffect(()=>{
        fetch("http://localhost:3001/auth/fetchuser",{
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                "auth-token" : window.localStorage.getItem('authToken')
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setData(data)
            console.log(data)
        })
    },[])
  return (
    <div>

      {
        data?
        <ProfileLayout user={data.userData}/>:
        <div>fetching...</div>
      }
      </div>
  )
}

export default Profile
