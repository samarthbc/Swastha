import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate()

    const signupHandle = async (e) => {
        e.preventDefault()

        if (credentials.password === credentials.cpassword) {

            let selectedValue = document.querySelector('input[name="flexRadioDefault"]:checked').value
            if (selectedValue === "member") {

                const response = await fetch("http://localhost:5000/api/auth/createuser", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
                });
                const json = await response.json()

                if (json.success) {
                    // Saving the auth-token
                    localStorage.setItem('token', json.authtoken);
                    localStorage.setItem('account-type',"member")
                    navigate('/')
                }
                else {
                    document.getElementById('InvalidCred2').style.display = 'block'
                    setTimeout(()=>{
                        document.getElementById('InvalidCred2').style.display = 'none'
                    })
                }

            }

            if (selectedValue === "doctor") {

                const response = await fetch("http://localhost:5000/api/docauth/createdoc", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
                });
                const json = await response.json()

                if (json.success) {
                    // Saving the auth-token
                    localStorage.setItem('token', json.authtoken);
                    localStorage.setItem('account-type',"doctor")
                    navigate('/')
                }
                else {
                    document.getElementById('InvalidCred2').style.display = 'block'
                    setTimeout(()=>{
                        document.getElementById('InvalidCred2').style.display = 'none'
                    }, 5000)
                }

            }
        }

        else {
            document.getElementById('InvalidCred').style.display = 'block'
            setTimeout(()=>{
                document.getElementById('InvalidCred').style.display = 'none'
            }, 5000)
        }

    }

    const handleOnChange = async (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <><div id="loginsetup">
            <h2 className="container-fluid text-center pt-4">SIGN UP</h2>
            <form>
                <div className="d-flex flex-column my-2" style={{ maxWidth: "500px", margin: "auto auto" }}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="exampleInputName" minLength={3} name='name' onChange={handleOnChange} value={credentials.name} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleOnChange} value={credentials.email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' onChange={handleOnChange} minLength={5} value={credentials.password} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={handleOnChange} minLength={5} value={credentials.cpassword} />
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="member" checked />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Member
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="doctor" />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Doctor
                        </label>
                    </div>
                    <h6 id='InvalidCred' className='text-danger' style={{ display: 'none' }}>Password and confirm password doent match</h6>
                    <h6 id='InvalidCred2' className='text-danger' style={{ display: 'none' }}>An account with this email already exists</h6>
                    <button type="submit" className="btn btn-warning" onClick={signupHandle}>Sign up <i className="fa-solid fa-user-plus"></i></button>
                </div>
            </form>
        </div></>
    )
}

export default Signup