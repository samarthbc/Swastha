import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import urlcontext from '../context/urlcontext'

function Appointments() {
    
    const context = useContext(urlcontext)
    const {server_url} = context


    const Navigate = useNavigate()
    const [allappointments, setAllappointments] = useState([])

    const getappointments = async () => {
        if (localStorage.getItem('token')) {

            if (localStorage.getItem("account-type") === "member") {
                console.log("member")

                let response = await fetch(`${server_url}/api/appointment/getappointmentuser`, {
                    method: "POST",
                    headers: {
                        'auth-token': localStorage.getItem('token')
                    }
                })
                let parsedResponse = await response.json()
                setAllappointments(parsedResponse)
            }
            else {
                console.log("doctor")

                let response = await fetch(`${server_url}/api/appointment/getappointmentdoc`, {
                    method: "POST",
                    headers: {
                        'auth-token': localStorage.getItem('token')
                    }
                })
                let parsedResponse = await response.json()
                setAllappointments(parsedResponse)

            }
        }
        else {
            Navigate('/login')
        }
    }


    useEffect(() => {
        getappointments()

    }, [])


    return (
        <>
            {localStorage.getItem('account-type') === "member" ? (
                <div>

                    <h3 className="text-danger text-center mt-3 nb-check" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bolder", fontSize: "40px" }}>Your Appointments</h3>

                    {allappointments.map((element) => {

                        return (

                            <div className="container d-flex border border-success rounded flex-column my-3" style={{ width: "50vw" }}>
                                <span>You scheduled this appointment on: {element.currentdate}</span>
                                <span>Appointment date: {element.appointmentdate}</span>
                                <h5 className='mt-3'>Doctor: </h5>
                                <span>Name: {element.doctor.name}</span>
                                <span>Contact: {element.doctor.email}</span>
                                <img src={`${server_url}/${element.doctor.profileimg}`} alt="..." className='img-fluid rounded-circle' style={{ "width": "8vw", height: "8vw" }} />
                                <span className='mt-3'>Description:</span>
                                <span>{element.description}</span>
                            </div>
                        )
                    })}


                </div>
            ) : (

                <div>

                    <h3 className="text-danger text-center mt-3 nb-check" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bolder", fontSize: "40px" }}>Scheduled Appointments for you</h3>

                    {allappointments.map((element) => {
                        return (

                            <div className="container d-flex border border-success rounded flex-column my-3" style={{ width: "50vw" }}>
                                <span>Appointment date: {element.appointmentdate}</span>
                                <h5 className='mt-3'>Appointment scheduled by:</h5>
                                <span>Name: {element.user.name}</span>
                                <span>Contact: {element.user.email}</span>
                                <span>Age: {element.user.age}</span>
                                <span>Gender: {element.user.gender}</span>
                                <img src={`${server_url}/${element.user.profileimg}`} alt="..." className='img-fluid rounded-circle' style={{ "width": "8vw", height: "8vw" }} />
                                <span className='mt-3'>Reason for Appointment:</span>
                                <span>{element.description}</span>
                            </div>
                        )
                    })}



                </div>

            )}
        </>
    )
}

export default Appointments