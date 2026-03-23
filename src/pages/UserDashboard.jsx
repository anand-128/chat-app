import React from 'react'
import { useOutletContext } from 'react-router-dom'

const UserDashboard = () => {

  const{user} = useOutletContext()
  return (
    <div>
      Hey{user.name} <br />
      email{user.email}
    </div>
  )
}

export default UserDashboard