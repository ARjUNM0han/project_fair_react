import React, { useEffect, useState } from 'react'
import './style.css'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import { Link } from 'react-router-dom'
import { getAllProjects } from '../../Services/allApi'

function Landing() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [projects, setProjects] = useState([])
  useEffect(() => {
    getProjects()
    if (sessionStorage.getItem('token')) {
      setLoginStatus(true)
    } else {
      setLoginStatus(false)
    }
  }, [])

  const getProjects = async () => {
    const res = await getAllProjects()
    if (res.status == 200) {
      setProjects(res.data.slice(0, 3))
    } else {
      console.log('all projects', res)
    }
  }
  return (
    <>
      <section className="header-area header-eight">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="header-content">
                <h1>Project Fair</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium, voluptatem! Sapiente mollitia eum assumenda aliquam, quisquam ad aperiam quis tempore repudiandae repellat consectetur atque soluta veritatis magni. Sapiente, in autem!
                </p>
                <div className="button">
                  {loginStatus ?
                    <Link to={'/dashboard'} className="btn btn-warning">
                      To dashboard
                    </Link>
                    :
                    <Link to={'/auth'} className="btn btn-success">
                      Get Started
                    </Link>
                  }
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="header-image">
                <img src="https://www.pngkey.com/png/full/953-9530974_flat-build-illustration-website.png" alt="#" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='mt-5'>
        <h3>Sample Projects</h3>
        {projects.length > 0 ?
          <div>
            <marquee behavior="" direction="">
              <div className='project-cards'>
                {projects.map((item) => (
                  <ProjectCard project={item} key={item._id} />
                ))}

              </div>
            </marquee>
          </div>
          :
          <h4>No Projects added</h4>
        }
      </div>

      <div>
        <p className='text-center'>
          <Link to={'/all-projects'}>
           <span href="" className='text-center'>...view more</span>
          </Link>
        </p>
      </div>
    </>
  )
}

export default Landing