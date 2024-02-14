import React from 'react'

function Footer() {
    return (
        <>
            <div className="bg-warning d-flex justify-content-around align-items-center">
                <img src={require("../static/logos/swastha_logo_cropped-removebg.png")} style={{ width: "8vw", height: "auto" }} alt="" className="img-fluid my-3" />
                <div>
                    <p className='my-3' style={{ fontWeight: "bold" }}>Copyright © 2023 SWASTHA CONSULTANCY SERVICES PVT-LTD ALL RIGHTS RESERVED</p>
                    <p className='text-center'>
                        <span>CSR POLICY |</span>
                        <span> DISCLAIMER |</span>
                        <span> PRIVACY POLICY |</span>
                        <span> T&C </span>
                    </p>
                </div>
                <div className="d-flex flex-column">
                    <div>Project By:</div>
                    <div>Unknown Alien</div>
                    <div>
                        <i class="fa-brands fa-github"> </i> <i class="fa-brands fa-discord"></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer