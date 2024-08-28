import React, { useState, useContext } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { register, login } from '../../Services/allApi';
import { toast } from 'react-toastify';
import { authContext } from '../../Context/AuthContext';

function Auth() {
  const [registerStatus, setRegisterStatus] = useState(false)
  const { authStatus, setAuthStatus } = useContext(authContext)
  const [registerUser, setRegisterUser] = useState({
    userName: '', password: '', email: ''
  })

  const navigate = useNavigate()

  const handleRegister = () => {
    setRegisterStatus(!registerStatus)
  }

  const handleUserRegister = async () => {
    // console.log(registerUser)
    const { userName, password, email } = registerUser
    if (!userName || !password || !email) {
      toast.info('fill valid inputs')
    } else {
      const result = await register(registerUser)
      if (result.status == 200) {
        setRegisterUser({
          userName: '', password: '', email: ''
        })
        toast.success('registration successfull')
      } else {
        toast.error('registration failed')
      }
    }
  }

  const handleLogin = async () => {
    const { password, email } = registerUser
    if (!email || !password) {
      toast.info('fill valid inputs')
    } else {
      const result = await login(registerUser)
      console.log(result)
      if (result.status == 200) {
        setRegisterUser({
          password: '', email: ''
        })
        sessionStorage.setItem('token', result.data.token)
        sessionStorage.setItem('username', result.data.username)
        const userDetails = { username: result.data.username, github: result.data.userGit, linkdin: result.data.userLinkdin, profilePicture: result.data.profilePicture }
        sessionStorage.setItem('userDetails', JSON.stringify(userDetails))
        setAuthStatus(true)
        navigate('/')
      } else {
        toast.error('login failed')
      }
    }
  }

  return (
    <div style={{ height: '90vh', marginBottom: '20px' }} className='mb-5'>
      <section >
        <div className="container-fluid h-custom ">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-md-9 col-lg-6 col-xl-5 mt-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mt-5">
              <div>
                {registerStatus ?
                  <h3>Register</h3>
                  :
                  <h3>Login</h3>
                }
              </div>
              <form >
                <div className="form-outline mb-4">
                  <FloatingLabel controlId="floatingEmail" label="Email">
                    <Form.Control type="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      autoComplete='email'
                      onChange={(e) => { setRegisterUser({ ...registerUser, email: e.target.value }) }} />
                  </FloatingLabel>
                </div>
                {registerStatus &&
                  <div className="form-outline mb-4">
                    <FloatingLabel controlId="floatingUSer" label="Username">
                      <Form.Control
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Username"
                        autoComplete='username'
                        onChange={(e) => { setRegisterUser({ ...registerUser, userName: e.target.value }) }} />
                    </FloatingLabel>
                  </div>
                }
                {/* Password input */}
                <div className="form-outline mb-3">
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="password"
                      autoComplete='new-password'
                      onChange={(e) => { setRegisterUser({ ...registerUser, password: e.target.value }) }} />
                  </FloatingLabel>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">

                  {registerStatus ?
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      onClick={handleUserRegister}
                    >
                      Register
                    </button>
                    :
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                  }

                  {
                    registerStatus ?
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Already a user?{" "}
                        <Link className="link-danger" onClick={handleRegister}>
                          Login
                        </Link>
                      </p>
                      :
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?{" "}
                        <Link className="link-danger" onClick={handleRegister}>
                          Register
                        </Link>
                      </p>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default Auth