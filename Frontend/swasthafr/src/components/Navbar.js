import React, {useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'



const Navbar = () => {

    let location = useLocation();
    let navigate = useNavigate();

    function emergencyclick() {
        alert("Contacting emergency services immediately \nEnable location access to provide Ambulance services");
    }

    function loginclick() {
        navigate('/login')
    }

    function signupclick() {
        navigate('/signup')
    }

    function logoutclick() {
        localStorage.removeItem('token')
        localStorage.removeItem('account-type')
        navigate('/')
    }

    const [userdet, setUserdet] = useState([])
    const getpfpimg = async() =>{

        if(localStorage.getItem('account-type')=='member'){
            let response = await fetch("http://localhost:5000/api/auth/getuser",{
                method:"POST",
                headers:{
                    'auth-token':localStorage.getItem('token')
                }
            })
            let parsedResponse = await response.json()
            setUserdet(parsedResponse)
        }
        else{
            let response = await fetch("http://localhost:5000/api/docauth/getdoc",{
                method:"POST",
                headers:{
                    'auth-token':localStorage.getItem('token')
                }
            })
            let parsedResponse = await response.json()
            setUserdet(parsedResponse)
        }


    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getpfpimg()
        }
    },[])

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-warning">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={require("../static/logos/swastha_icon_cropped-removebg.png")} alt="logo" width="35px" height="35px" />
                    </Link>
                    <Link to="/" className="navbar-brand" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: "bold", fontSize: "25px" }}>Swastha</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/services" ? "active" : ""}`} to="/services">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/specialisations" ? "active" : ""}`} to="/specialisations">Specialisations</Link>
                            </li>
                        </ul>

                        <button type="button" className="btn btn-danger mx-4" onClick={emergencyclick}><i className="fa-solid fa-truck-medical"></i> Emergency</button>

                        <form className="d-flex" role="search">
                            <input className="form-control me-1" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success me-2" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>

                        {localStorage.getItem('token') ?
                            <div>
                                <img className='rounded-circle img-fluid' style={{ width: "35px", height: "35px" }} src={`http://localhost:5000/${userdet.profileimg}`} alt="" />

                                <div className="dropdown" style={{display:"inline-block"}}>
                                    <button className="btn btn-warning" style={{padding:"0px"}} data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-sort-down ps-1" style={{fontSize:"20px"}}></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link to="/editprofile" className="dropdown-item">Edit profile</Link></li>
                                        <li><button className="dropdown-item" onClick={logoutclick}>Logout</button></li>
                                    </ul>
                                </div>

                            </div>
                            :
                            <div>
                                <button type="button" className="btn btn-success mx-1" onClick={loginclick}>Login</button>
                                <button type="button" className="btn btn-success mx-1" onClick={signupclick}>Join us</button>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar