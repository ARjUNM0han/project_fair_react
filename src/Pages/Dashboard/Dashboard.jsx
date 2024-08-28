import React, { useState, useEffect } from 'react'
import Header from '../../Components/Header/Header'
import MyProject from '../../Components/MyProject/MyProject'
import Profile from '../../Components/Profile/Profile'

function Dashboard() {

  const [username, setUsername] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('username')) {
      setUsername(sessionStorage.getItem('username'))
    }
  }, [])
  return (
    <>
      <Header btn={true} />
      <h3 className='p-2' >Welcome <span className='text-danger text-uppercase'>{username}</span></h3>
      <div className='container'>
        <div className="container-fluid ms-lg-5 ms-md-3">
          <div className="row gap-5">
            <div className="col-md-8 border border-light p-2 rounded ">
              <MyProject />
            </div>
            <div className="col-md-3 border border-light p-2 rounded">
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard