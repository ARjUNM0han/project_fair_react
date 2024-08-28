import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import ProjectCard from '../../Components/ProjectCard/ProjectCard'
import { getAllProjects } from '../../Services/allApi'

function AllProjects() {

  const [loginStatus, setLoginStatus] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setLoginStatus(true)
      fetchProducts()
    } else {
      setLoginStatus(false)
    }
  }, [])

  const fetchProducts = async () => {
    const result = await getAllProjects()
    if (result.status == 200) {
      setProjects(result.data)
    } else {
      console.log(result)
    }
  }

  return (
    <>
      <Header />
      {loginStatus ?
        <div>
          <h3 className='text-center'>All Projects</h3>
          {projects.length > 0 ?
            <div className='mt-3 py-3'>
              {projects.map((item) => (
                <ProjectCard project={item} />
              ))}
            </div>
            :
            <div>
              <h3 className='text-danger'>No Projects available</h3>
            </div>
          }
        </div>
        :
        <div>
          <h3 className='text-center text-danger'>Please Login</h3>
        </div>

      }
    </>
  )
}

export default AllProjects