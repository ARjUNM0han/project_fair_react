import React, { useEffect, useState, useContext } from 'react'
import AddProject from '../AddProject/AddProject'
import EditProject from '../EditProject/EditProject'
import { getUserProjects } from '../../Services/allApi'
import { projectAddResponse, projectEditResponse } from '../../Context/ContextShare'
import { deleteProject } from '../../Services/allApi'
import { toast } from 'react-toastify'
function MyProject() {

    const [projects, setProjects] = useState([])
    const { addResponse, setAddResponse } = useContext(projectAddResponse)
    const { editResponse, setEditResponse } = useContext(projectEditResponse)

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            userProjects()
        }
    }, [addResponse, editResponse])

    const userProjects = async () => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
        const res = await getUserProjects(header)
        if (res.status == 200) {
            setProjects(res.data)
        } else {
            console.log('user projects', res)
        }
    }

    const deletePro = async (id) => {
        const header = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
        const result = await deleteProject(id, header)
        if (result.status == 200) {
            userProjects()
            toast.success(result.data)
        } else {
            console.log(result, 'project delete error')
            toast.error('deletion Failed')
        }
    }
    return (
        <>
            <div className='p-1'>
                <div className='p-2 ' >
                    <AddProject />
                </div>
                {projects.length > 0 ?
                    <div className="row m-2">
                        {projects.map((item) => (
                            <div className="col-xl-6 col-md-12 " key={item._id}>
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-body row">
                                            <div className="row justify-content-between">
                                                <div className="">
                                                    <h1 className="mr-2">{item.title}</h1>
                                                </div>
                                                <div className="">
                                                    <a href={item.github} target='_blank' className='btn border border-light rounded mx-1'> <i className="fa-brands fa-github" /></a>
                                                    <EditProject project={item} />
                                                    <button className='btn border border-light rounded mx-1' onClick={() => { deletePro(item._id) }}>
                                                        <i className=" fa-duotone fa-solid fa-trash" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    :
                    <h3>No Projects added yet!</h3>
                }
            </div>
        </>
    )
}

export default MyProject