import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../../Services/base_url';
import { toast } from 'react-toastify';
import { updateProject } from '../../Services/allApi';
import { projectEditResponse } from '../../Context/ContextShare';

function EditProject({ project }) {
    const [show, setShow] = useState(false);
    const [previewImg, setPreviewImg] = useState('')
    const [pictureStatus, setPictureStatus] = useState(false)
    const [projectData, setProjectData] = useState({
        ...project
    })
    const { editResponse, setEditResponse } = useContext(projectEditResponse)
    useEffect(() => {
        if (projectData.picture.type != 'image/png' && projectData.picture.type != 'image/jpg' && projectData.picture.type != 'image/jpeg') {
            setPictureStatus(false)
            setProjectData({
                ...project
            })
            setPreviewImg('')
        } else {
            setPictureStatus(true)
            setPreviewImg(URL.createObjectURL(projectData.picture))
        }
    }, [projectData.picture])

    const handleClose = () => {
        setShow(false)
        setPreviewImg('')
        setProjectData({
            ...project
        })
    };
    const handleShow = () => setShow(true);

    const handleUpdate = async () => {
        const { title, description, languages, demo, github, picture } = projectData
        if (!title || !description || !languages || !demo || !github || !picture) {
            toast.warning('fill all input fields')
        } else {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('description', description)
            formData.append('languages', languages)
            formData.append('demo', demo)
            formData.append('github', github)
            formData.append('picture', picture)
            if (pictureStatus) {

                const header = {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
                const result = await updateProject(projectData._id, formData, header)
                if (result.status == 200) {
                    toast.success('Project Updated')
                    setEditResponse(result)
                    handleClose()
                } else {
                    toast.error('Updation failed')
                    console.log(result)
                }
            } else {
                const header = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
                const result = await updateProject(projectData._id, formData, header)
                if (result.status == 200) {
                    toast.success('Project Updated')
                    setEditResponse(result)
                    handleClose()
                } else {
                    toast.error('Updation failed')
                    console.log(result)
                }
            }

        }

    }
    return (
        <>
            <button onClick={handleShow} className='btn border border-light rounded mx-1'> <i className="fa-regular fa-pen-to-square" /></button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="div col">
                            <label htmlFor="image">
                                <input type="file" id='image' className='d-none' onChange={(e) => { setProjectData({ ...projectData, picture: e.target.files[0] }) }} />
                                <img src={previewImg ? previewImg : `${base_url}/upload/${projectData?.picture}`} alt="" className='img-fluid' />
                                {!pictureStatus &&
                                    <p className='text-danger'> Image is required and must be .png or .jpg or .jpeg format</p>
                                }
                            </label>
                        </div>
                        <div className="div col my-2">
                            <FloatingLabel controlId="title" label="Title" className='my-1'>
                                <Form.Control type="text" placeholder="Title" value={projectData?.title} onChange={(e) => { setProjectData({ ...projectData, title: e.target.value }) }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="description" label="Description" className='my-1'>
                                <Form.Control type="text" placeholder="Description" value={projectData?.description} onChange={(e) => { setProjectData({ ...projectData, description: e.target.value }) }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="languages" label="Languages" className='my-1'>
                                <Form.Control type="text" placeholder="Languages" value={projectData?.languages} onChange={(e) => { setProjectData({ ...projectData, languages: e.target.value }) }} />
                            </FloatingLabel>

                        </div>
                        <div>
                            <FloatingLabel controlId="git-url" label="Git-URL" className='my-1'>
                                <Form.Control type="text" placeholder="Git-URL" value={projectData?.github} onChange={(e) => { setProjectData({ ...projectData, github: e.target.value }) }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="demo-link" label="Demo Link" className='my-1'>
                                <Form.Control type="text" placeholder="Demo Link" value={projectData?.demo} onChange={(e) => { setProjectData({ ...projectData, demo: e.target.value }) }} />
                            </FloatingLabel>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditProject