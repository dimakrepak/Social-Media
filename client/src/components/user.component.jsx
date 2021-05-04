import React, {useEffect, useState} from 'react'

import axios from 'axios';


function User() {
  const [user, setUser] = useState(null)

  const getUser = async () =>{
    const data = await axios.get('api/posts')
    setUser(data.data)
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="App">
    {console.log(user)}
    </div>
  );
}

export default User;
