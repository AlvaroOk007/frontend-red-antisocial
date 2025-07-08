import { useEffect, useState } from 'react'

export const useGetUsers = () => {
  const [users,setUsers] = useState([])
  useEffect(()=>{
    fetch(`http://localhost:3001/users`)
    .then(res=>res.json())
    .then(allUsers => setUsers(allUsers))
  },[])
  return{ users }
}