import React, { useEffect, useState } from 'react'
import ProfileLayout from './ProfileLayout'
import { request } from '../../common/api/config'
import { fetchUserAPI } from '../../common/api/apiCall'

function Profile() {
    const [data, setData] = useState(null)
    useEffect(()=>{
        request(fetchUserAPI)
        .then(response => setData(response))
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
