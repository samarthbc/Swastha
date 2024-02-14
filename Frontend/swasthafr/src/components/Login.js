import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css';

function Login() {

    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {

        e.preventDefault()

        let selectedValue = document.querySelector('input[name="flexRadioDefault"]:checked').value

        if (selectedValue === "member") {

            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json()

            if(json.success){
                // Saving the auth-token
                localStorage.setItem('token', json.authtoken);
                localStorage.setItem('account-type',"member")
                navigate('/')
            }
            else{
                document.getElementById('InvalidCred').style.display = 'block'
                setTimeout(()=>{
                    document.getElementById('InvalidCred').style.display = 'none'
                }, 5000)
            }
        }
        else {

            const response = await fetch("http://localhost:5000/api/docauth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json()

            if(json.success){
                // Saving the auth-token
                localStorage.setItem('token', json.authtoken);
                localStorage.setItem('account-type',"doctor")
                navigate('/')
            }
            else{
                document.getElementById('InvalidCred').style.display = 'block'
            }
        }
    }

    const handleOnChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <><div id="loginsetup">
            <h2 className="container-fluid text-center pt-5">LOGIN</h2>
            <form>
                <div className="d-flex flex-column my-2" style={{ maxWidth: "500px", margin: "auto auto" }}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" value={credentials.email} onChange={handleOnChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="exampleInputPassword1" value={credentials.password} onChange={handleOnChange} minLength={5}/>
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

                    <h6 id='InvalidCred' className='text-danger' style={{display:'none'}}>Invalid Credentials, Please try again...</h6>

                    <button type="submit" className="btn btn-warning" onClick={handleSubmit}>Login <i className="fa-solid fa-right-to-bracket"></i></button>
                </div>
            </form>
        </div></>
    )
}

export default Login