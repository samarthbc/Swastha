import React from 'react'
import { Link } from 'react-router-dom'

function SubNavbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg" style={{"backgroundColor": "#ffd65b"}}>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 container-fluid d-flex justify-content-center">
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/doctors"><i className="fa-solid fa-user-doctor"></i> Doctors</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link " aria-current="page" to="/appointments"><i className="fa-solid fa-calendar-check"></i> Appointments</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/report"><i className="fa-solid fa-chart-simple"></i> Health report</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/store"><i className="fa-solid fa-kit-medical"></i> Store</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/blog"><i className="fa-brands fa-blogger-b"></i> Blog</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/news"><i className="fa-regular fa-newspaper"></i> News</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className="nav-link" to="/donate"><i className="fa-solid fa-hand-holding-medical"></i> Donate</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default SubNavbar