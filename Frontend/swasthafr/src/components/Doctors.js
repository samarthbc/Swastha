import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './Doctor.css'
import urlcontext from '../context/urlcontext'

function Doctors() {
  
  const context = useContext(urlcontext)
  const {server_url} = context


  const Navigate = useNavigate()
  const [docs, setDocs] = useState([])

  const getdocs = async () => {
    let alldocs = await fetch(`${server_url}/api/docauth/getalldoc`)
    let parsedAlldocs = await alldocs.json()
    setDocs(parsedAlldocs);
  }

  useEffect(() => {
    getdocs();
  }, [])

  const handleOnClickBookAppointment = (docId) => {
    console.log(docId)
    if (localStorage.getItem('token')) {
      if(localStorage.getItem('account-type')==='member'){
        Navigate(`/bookappointment/${docId}`)
      }
      else{
        Navigate('/appointments')
      }

    }
    else {
      Navigate('/login')
    }
    
  }

  return (
    <>
      <h3 className='text-center mt-4 text-danger' style={{ fontFamily: "'Caveat', cursive", fontWeight: "bolder", fontSize: "40px" }}>Our Doctors</h3>
      <div className="container d-flex flex-column align-items-center mt-3">


        {docs.map((element) => {
          return (
            <div className="d-flex justify-content-start nb-card border border-success rounded my-2 align-items-center position-relative">
              <img id='docimg' src={`${server_url}/${element.profileimg}`} alt="" className='rounded-circle my-2 ms-2' style={{height:"15vw",width:"15vw"}} />
              <div className="ms-5 my-2">
                <h5>{element.name}</h5>
                <p>{element.specialisation} </p>
                <p>{element.description}</p>
                <p>Experience: {element.experience} </p>
                <button className="btn btn-success btn-sm" onClick={() => handleOnClickBookAppointment(element._id)}>Book Appointment <i className="fa-regular fa-calendar"></i></button>
              </div>

              {element.certified &&
                <span className="badge bg-primary position-absolute top-0 start-100 translate-middle px-3 py-2">Certified <i className="fa-regular fa-circle-check"></i></span>
              }

            </div>
          )
        })}


      </div>
    </>
  )
}

export default Doctors