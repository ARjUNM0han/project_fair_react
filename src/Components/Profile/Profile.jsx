import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../../Services/base_url';
import { updateProfile } from '../../Services/allApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Profile() {

  const [editProfileState, setEditProfileState] = useState(false)
  const [profile, setProfile] = useState({
    username: '', github: '', linkdin: '', profilePicture: ''
  })
  const [profileImgPreview, setProfileImgPreview] = useState('')
  const [pic, setPic] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      setProfile(JSON.parse(sessionStorage.getItem('userDetails')))
    }
    if (pic) {
      setProfileImgPreview(URL.createObjectURL(pic))
      setProfile({ ...profile })
    }
  }, [pic])

  const handleProfileState = () => {
    setEditProfileState(!editProfileState)
  }

  const handleUpdate = async () => {
    const { username, github, linkdin } = profile
    if (!username || !github || !linkdin) {
      toast.warning('Enter Valid Data')
    } else {
      if (pic) {
        const formData = new FormData()
        formData.append('userName', username)
        formData.append('github', github)
        formData.append('linkdin', linkdin)
        formData.append('profilePicture', pic)

        const header = {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }

        const result = await updateProfile(formData, header)
        if (result.status == 200) {
          toast.success('Profile updated')
          handleProfileState()
          navigate('/auth')
        } else {
          toast.error('Could Not update Profile')
          console.log(result)
        }
      } else {
        const header = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
        const result = await updateProfile(profile, header)
        if (result.status == 200) {
          toast.success('Profile updated')
          handleProfileState()
          navigate('/auth')
        } else {
          toast.error('Could Not update Profile')
          console.log(result)
        }
      }
    }
  }
  return (
    <>
      <div>
        <div className='d-flex justify-content-between'>
          <h3>Profile</h3>
          <button onClick={handleProfileState} className='btn border border-light shadow rounded'>
            {editProfileState ?
              <i className="fa-duotone fa-solid fa-arrow-up" />
              :
              <i className="fa-duotone fa-solid fa-arrow-down" />
            }
          </button>

        </div>

        <div className='mt-3 ' style={editProfileState ? {} : { display: 'none' }}>
          <div className='p-5 text-center'>
            <label htmlFor="profileImage">
              <input type="file" id='profileImage' className='d-none' onChange={(e) => { setPic(e.target.files[0]) }} accept="image/*" />
              <img src={profileImgPreview ? profileImgPreview : profile.profilePicture ? `${base_url}/upload/${profile.profilePicture}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpa4Ues44Acr2NK4__mDeIkawXgtxJd0TmA&usqp=CAU"} className='img-fluid' alt="profile" />
            </label>
          </div>
          <FloatingLabel controlId="username" label="Username" className='my-2'>
            <Form.Control type="text" placeholder="username" value={profile.username} onChange={(e) => { setProfile({ ...profile, username: e.target.value }) }} />
          </FloatingLabel>
          <FloatingLabel controlId="github-link" label="Git Hub Link" className='my-2'>
            <Form.Control type="text" value={profile.github} onChange={(e) => { setProfile({ ...profile, github: e.target.value }) }} />
          </FloatingLabel> <FloatingLabel controlId="username" label="Linkdin Link" className='my-2'>
            <Form.Control type="text" value={profile.linkdin} onChange={(e) => { setProfile({ ...profile, linkdin: e.target.value }) }} />
          </FloatingLabel>
          <div className='text-center  d-block'>
            <button className=' btn btn-warning mt-2  ' onClick={handleUpdate}>Update</button>
          </div>
        </div>
      </div>

    </>

  )
}

export default Profile