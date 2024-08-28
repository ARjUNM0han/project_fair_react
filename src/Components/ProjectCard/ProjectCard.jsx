import React, { useState } from 'react'
import base_url from '../../Services/base_url'
import Modal from 'react-bootstrap/Modal';
function ProjectCard({ project }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                <div className="col">
                    <div className="card " onClick={handleShow}>
                        <img src={`${base_url}/upload/${project.picture}`} height={'200px'} />
                    </div>
                </div>
            </div>



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{project.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <img src={`${base_url}/upload/${project.picture}`} className='img-fluid' />
                        </div>
                        <div className="col-sm-12 col-md-6" >
                            <h2> {project.title}</h2>
                            <h4>{project.description}</h4>
                            <div className='d-flex justify-content-between p-3'>
                                <div>
                                    <i className="fa-brands fa-github fa-xl" />
                                </div>
                                <div>
                                    <i className="fa-solid fa-link fa-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProjectCard