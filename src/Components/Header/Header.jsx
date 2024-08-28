import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';

function Header({ btn }) {
    const { authStatus, setAuthStatus } = useContext(authContext)
    const navigate = useNavigate()
    const logout = () => {
        navigate('/auth')
        setAuthStatus(false)
        sessionStorage.clear()
    }
    return (
        <Navbar className="bg-secondary">
            <Container>
                <Navbar.Brand href="/">
                    Project Fair
                </Navbar.Brand>
                akdsjnnk
            </Container>
            {
                btn &&
                <button onClick={logout} className='btn border  border-white shadow me-lg-3 text-white'><i className="fa-solid fa-power-off" style={{ color: 'black' }}></i></button>
            }
        </Navbar>
    )
}

export default Header