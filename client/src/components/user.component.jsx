import React, {useEffect, useState} from 'react'

import axios from 'axios';


function User() {
  const [user, setUser] = useState(null)

  const getUser = async () =>{
    const data = await axios.get('api/posts')
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="App">
    <p>asdsadsad</p>
    </div>
  );
}

export default User;
