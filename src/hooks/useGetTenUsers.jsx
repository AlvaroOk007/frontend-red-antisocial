import { useEffect, useState } from 'react'

export const useGetTenUsers = () => {
  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch(`http://localhost:3001/users`)
    .then(res=>res.json())
    .then(allUsers => setUsers(allUsers.slice(0,5)))
  },[])
  return{ users }
}


