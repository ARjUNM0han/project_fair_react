import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-secondary text-white text-center text-lg-start mt-5">
      {/* Grid container */}
      <div className="container py-4">
        {/*Grid row*/}
        <div className="row">
          {/*Grid column*/}
          <div className="col-lg-5 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Project Fair</h5>
            <p style={{ textAlign: 'justify' }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque
              ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae
              repudiandae aliquam voluptatem veniam, est atque cumque eum delectus
              sint!
            </p>
          </div>
          {/*Grid column*/}
          {/*Grid column*/}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0 d-flex flex-column ">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li className='mb-2'>
                <Link to={'/'} className="text-white">
                  Landing
                </Link>
              </li>
              <li className='mb-2'>
                <Link to={'/auth'} className="text-white">
                  Login
                </Link>
              </li>

            </ul>
          </div>
          {/*Grid column*/}
          {/*Grid column*/}
          <div className="col-lg-4   col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Links</h5>
            <div>
              <p>Contact Us : 9876543210</p>
              <p>Address : Kozhikode,Kerela</p>
              <label htmlFor="exampleTextarea" className="form-label ">
                Feedback :
              </label>
              <textarea
                className="form-control"
                id="exampleTextarea"
                rows={2}
                defaultValue={""}
              />

            </div>
          </div>
          {/*Grid column*/}
        </div>
        {/*Grid row*/}
      </div>
      {/* Grid container */}
      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2024 Copyright
      </div>
      {/* Copyright */}
    </footer>
  )
}

export default Footer