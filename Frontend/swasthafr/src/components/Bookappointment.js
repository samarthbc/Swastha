import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import urlcontext from '../context/urlcontext'


function Bookappointment() {
    
    const context = useContext(urlcontext)
    const {server_url} = context

    const [doc, setDoc] = useState([])
    const [appointment, setAppointment] = useState([])

    const { id } = useParams()
    const Navigate = useNavigate();

    const getdocdetails = async () => {
        console.log(id)

        let response = await fetch(`${server_url}/api/docauth/getdocwithid/${id}`)
        let parsedDoc = await response.json()
        setDoc(parsedDoc)
    }

    useEffect(() => {
        getdocdetails();
    }, [])

    const fillvals = (e) => {
        setAppointment({...appointment,[e.target.name]: e.target.value})
    }


    useEffect(()=>{
        const currentdate = new Date()
        let mindate = new Date()
        mindate.setDate(currentdate.getDate()+1)
    
        mindate = mindate.toISOString().split('.')[0]
        document.getElementById('datapp').setAttribute('min',mindate)
    },[])


    const handleBookAppointmet = async(e) => {

        let response = await fetch(`${server_url}/api/appointment/new`, {
            method: "POST",
            headers: {
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({ doctor: id, appointmentdate: appointment.appointmentdate, description: appointment.description })
        })
        let parsedResponse = await response.json()
        Navigate('/appointments')

    }

    return (
        <>
            <div className="container d-flex align-items-center flex-column mt-5">
                <h3 className='text-danger' style={{}}>Book an Appointment</h3>
                <form>
                    <div className="d-flex flex-column mt-3" style={{ width: "50vw" }}>
                        <p style={{ fontSize: "20px" }}>Doctor: {doc.name}</p>
                        <p style={{ fontSize: "20px" }}>Email: {doc.email}</p>

                        <label style={{ fontSize: "20px" }} className='mt-4' htmlFor="datapp">Enter Appointment Date and Time : </label>
                        <input id='datapp' type="datetime-local" min="" name='appointmentdate' value={appointment.appointmentdate} onChange={fillvals}/>

                        <label style={{ fontSize: "20px" }} className='mt-2' htmlFor="textareadesc">Describe the purpose of your appointment :</label>
                        <textarea id="textareadesc" cols="30" rows="10" onChange={fillvals} name='description' value={appointment.description}></textarea>

                        <button className="btn btn-success mt-3 mb-5" onClick={handleBookAppointmet}>Book Appointment <i class="fa-solid fa-calendar-check"></i></button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Bookappointment