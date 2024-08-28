import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addProject } from '../../Services/allApi';
import { projectAddResponse } from '../../Context/ContextShare';

function AddProject() {
    const [show, setShow] = useState(false);
    const [pictureStatus, setPictureStatus] = useState(false)
    const [previewImg, setPreviewImg] = useState('')
    const { addResponse, setAddResponse } = useContext(projectAddResponse)
    const [projectData, setProjectData] = useState({
        title: '', description: '', languages: '', demo: '', github: '', picture: ''
    })
    useEffect(() => {
        if (projectData.picture.type != 'image/png' && projectData.picture.type != 'image/jpg' && projectData.picture.type != 'image/jpeg') {
            setPictureStatus(false)
            setProjectData({
                title: '', description: '', languages: '', demo: '', github: '', picture: ''
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
            title: '', description: '', languages: '', demo: '', github: '', picture: ''
        })
    };
    const handleShow = () => setShow(true);

    const handleAddProject = async () => {
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

            const header = {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }

            const result = await addProject(formData, header)
            if (result.status == 201) {
                setAddResponse(result)
                setProjectData({
                    title: '', description: '', languages: '', demo: '', github: '', picture: ''
                })
                handleClose()
                toast.success('Project added succesfully')
                setPreviewImg('')
            } else {
                setPreviewImg('')
                toast.error('Something went wrong ' + result.response.data)
            }
        }


    }
    return (
        <>
            <button className='btn border border-ligth' onClick={handleShow}>Add Project</button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className="div col">
                            <label htmlFor="image">
                                <input type="file" id='image' className='d-none' onChange={(e) => setProjectData({ ...projectData, picture: e.target.files[0] })} accept="image/*" />
                                <img src={previewImg ? previewImg : "https://static.thenounproject.com/png/4595376-200.png"} alt="" className='img-fluid' />
                                {!pictureStatus &&
                                    <p className='text-danger'> Image is required and must be .png or .jpg or .jpeg format</p>
                                }
                            </label>
                        </div>
                        <div className="div col my-2">
                            <FloatingLabel controlId="title" label="Title" className='my-1'>
                                <Form.Control type="text" placeholder="Title" onChange={(e) => setProjectData({ ...projectData, title: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel controlId="description" label="Description" className='my-1'>
                                <Form.Control type="text" placeholder="Description" onChange={(e) => setProjectData({ ...projectData, description: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel controlId="languages" label="Languages" className='my-1'>
                                <Form.Control type="text" placeholder="Languages" onChange={(e) => setProjectData({ ...projectData, languages: e.target.value })} />
                            </FloatingLabel>

                        </div>
                        <div>
                            <FloatingLabel controlId="git-url" label="Git-URL" className='my-1'>
                                <Form.Control type="text" placeholder="Git-URL" onChange={(e) => setProjectData({ ...projectData, github: e.target.value })} />
                            </FloatingLabel>
                            <FloatingLabel controlId="demo-link" label="Demo Link" className='my-1'>
                                <Form.Control type="text" placeholder="Demo Link" onChange={(e) => setProjectData({ ...projectData, demo: e.target.value })} />
                            </FloatingLabel>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProject}>Save</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default AddProject