import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function Report() {

    const Navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            Navigate('/login')
        }
    },[])

    return (
        <>

            {(localStorage.getItem('account-type') === "member") ? (
                <h3 className="text-center" style={{marginTop:"30vh",marginBottom:"30vh"}}>You can view your Reports here after an appointment</h3>
            ) : (
                <h3 className="text-center" style={{marginTop:"30vh",marginBottom:"30vh"}}>You can update Helath Reports of your patients here</h3>
            )}

        </>
    )
}

export default Report