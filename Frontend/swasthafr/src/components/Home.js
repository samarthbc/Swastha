import React from 'react'
import './Home.css'

function Home() {
  return (
    <>
      <div>
        <div id="carouselExampleRide" className="carousel slide carousel-fade" data-bs-ride="true">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={require("../static/hospital-slider/4-upscl.jpg")} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={require("../static/hospital-slider/2-upscl.jpg")} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={require("../static/hospital-slider/3-upscl.jpeg")} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={require("../static/hospital-slider/6-upscl.jpg")} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className='container-fluid d-flex justify-content-center position-absolute my-4' style={{ float: 'left', zIndex: 1 }}>
          <img className="mt-5" id='imgswastha' src={require("../static/logos/swastha_logo_cropped-removebg.png")} alt="" />
        </div>
      </div>

      {/* Below carousal */}
      <div className="text-center pt-5" id='Mission'>
        <h3 className='nb-fheading'>Better Health, Better Opporutnities</h3>
        <h3 className='nb-fheading'>Your Health, Our Resposibility</h3>
        <p className='mt-3 container nb-fpara'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, quaerat. Quos asperiores cum minus esse inventore eaque eius ipsam odit numquam, perferendis ad qui! Eligendi reiciendis odio rem omnis nostrum.</p>

        <div className="custom-shape-divider-bottom-1707060334">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </div>
      <div className="text-center pt-3" id="Achievements">
        <h3 className="nb-fheading">Our Achievements</h3>
      </div>
    </>
  )
}

export default Home