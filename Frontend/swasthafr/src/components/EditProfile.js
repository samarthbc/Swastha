import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function EditProfile() {

    const Navigate = useNavigate()
    const [userdetails, setUserdetails] = useState([])
    const [file, setFile] = useState()

    const fetchcurrent = async () => {
        if (localStorage.getItem('account-type') === 'member') {

            const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
            let currentuser = await response.json()
            setUserdetails(currentuser)
        }
        else {

            const response = await fetch(`http://localhost:5000/api/docauth/getdoc`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            })
            let currentuser = await response.json()
            setUserdetails(currentuser)
        }
    }

    useEffect(() => {
        fetchcurrent()
    }, [])

    const fillvals = (e) => {
        setUserdetails({ ...userdetails, [e.target.name]: e.target.value })
    }

    const handleImgChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleEditProfile = async (e) => {
        e.preventDefault()

        if (localStorage.getItem("account-type") === "member") {
            let updateprofile = await fetch("http://localhost:5000/api/auth/updateuser", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ name: userdetails.name, age: userdetails.age, gender: userdetails.gender })
            })

            const formData = new FormData()
            formData.append('file', file)
            let response = await fetch("http://localhost:5000/api/auth/updateuserimg", {
                method: "POST",
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData
            })

            Navigate('/editprofile')
        }
        else {
            let updateprofile = await fetch("http://localhost:5000/api/docauth/updatedoc", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ name: userdetails.name, specialisation: userdetails.specialisation, description: userdetails.description, experience: userdetails.experience })
            })

            const formData = new FormData()
            formData.append('file', file)
            let response = await fetch("http://localhost:5000/api/docauth/updatedocimg", {
                method: "POST",
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
                body: formData
            })

            Navigate('/editprofile')
        }
    }

    return (
        <>
            {localStorage.getItem('account-type') === 'member' ? (

                <form>
                    <div className="container d-flex justify-content-center flex-column align-items-center">
                        <h3 className="text-danger text-center mt-4 nb-check" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bolder", fontSize: "40px" }}>Edit Profile</h3>

                        <label htmlFor="pfpimg">Your profile picture:</label>
                        <img className="rounded-circle" src={`http://localhost:5000/${userdetails.profileimg}`} alt="image not loaded" style={{height:"20vw", width:"20vw"}}/>

                        <label htmlFor="pfpimg">Edit profile picture:</label>
                        <input type="file" name="profileimg" id="pfpimg" className='form-control' style={{ width: "50vw" }} onChange={handleImgChange} />

                        <div className='mt-3'>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id='name' className='form-control' style={{ width: "50vw" }} value={userdetails.name} onChange={fillvals} name='name' />
                        </div>

                        <div className='mt-3'>
                            <label htmlFor="age">Age:</label>
                            <input type="number" id='age' className='form-control' style={{ width: "50vw" }} value={userdetails.age} onChange={fillvals} min="0" max="100" name='age' />
                        </div>

                        <div className='mt-3' style={{ width: "50vw" }}>
                            <label htmlFor='gender'>Gender:</label>
                            <select name="gender" id="gender" className='form-control' value={userdetails.gender} onChange={fillvals}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Rather-Not-Say">Rather Not Say</option>
                            </select>

                        </div>

                        <button className="btn btn-success my-4" onClick={handleEditProfile}>Edit Profile <i className="fa-solid fa-user-pen"></i></button>

                    </div>

                </form>
            ) : (
                <form>
                    <div className="container d-flex justify-content-center flex-column align-items-center">
                        <h3 className="text-danger text-center mt-4 nb-check" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bolder", fontSize: "40px" }}>Edit Profile</h3>

                        <label htmlFor="pfpimg">Your profile picture:</label>
                        <img className="rounded-circle" src={`http://localhost:5000/${userdetails.profileimg}`} alt="image not loaded" style={{height:"20vw", width:"20vw"}}/>

                        <label htmlFor="pfpimg">Edit profile picture:</label>
                        <input type="file" name="profileimg" id="pfpimg" className='form-control' style={{ width: "50vw" }} onChange={handleImgChange} />

                        <div className='mt-3'>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id='name' className='form-control' style={{ width: "50vw" }} value={userdetails.name} onChange={fillvals} name='name' />
                        </div>

                        <div className='mt-3'>
                            <label htmlFor="specialisation">Specialisation:</label>
                            <input type="text" id='specialisation' className='form-control' style={{ width: "50vw" }} value={userdetails.specialisation} onChange={fillvals} name='specialisation' />
                        </div>

                        <div className='mt-3'>
                            <label htmlFor="description">Description:</label>
                            <textarea name="description" id="description" cols="30" rows="10" className="form-control" style={{ width: "50vw" }} value={userdetails.description} onChange={fillvals}></textarea>
                        </div>

                        <div className='mt-3'>
                            <label htmlFor="experience">Experience:</label>
                            <input type="text" id='experience' className='form-control' style={{ width: "50vw" }} value={userdetails.experience} onChange={fillvals} name='experience' />
                        </div>

                        <button className="btn btn-success my-3" onClick={handleEditProfile}>Edit Profile <i className="fa-solid fa-user-pen"></i></button>

                    </div>
                </form>
            )}
        </>
    )
}

export default EditProfile