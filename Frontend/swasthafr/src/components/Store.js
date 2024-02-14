import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreItem from './StoreItem'

function Store() {

  const [allitems, setAllitems] = useState([])
  const Navigate = useNavigate()
  const manageAddItem = (e) => {
    Navigate('/additem')
  }

  const getallitems = async() => {
    let response = await fetch("http://localhost:5000/api/shopitem/getall")
    let parsedResponse = await response.json()
    setAllitems(parsedResponse)
  }

  useEffect(()=>{
    getallitems()
  },[])

  const viewcart = () => {
    if(localStorage.getItem('token')){
      Navigate('/viewcart')
    }
    else{
      Navigate('/login')
    }
  }

  return (
    <>
      <div className="container d-flex mt-2 justify-content-between align-items-center">
        <div className='d-flex'>
          <input type="text" className='form-control ms-2 border border-success' id='search' style={{ width: "20vw", display: "inline-block" }} />
          <button className="btn btn-success ms-2"><i className="fa-solid fa-magnifying-glass"></i></button>
        </div>
        <button onClick={viewcart} className="btn btn-success"><i className="fa-solid fa-cart-shopping"></i></button>
      </div>

      <p className="text-center mt-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium numquam, dicta ab quisquam sapiente nostrum officiis soluta iusto exercitationem ex.</p>

      <div className="container mt-3">
        <div className="row">
          {allitems.map((element) => {
            return(
            <div className="col-md-3 my-2">
              <StoreItem 
                name={element.name}
                description={element.description}
                manuDate={element.manuDate}
                expDate={element.expDate}
                mrp={element.mrp}
                sp={element.sp}
                itemImg={element.itemImg}
                id ={element._id}
              />
            </div>
            )
          })}

          <button className="btn btn-success" onClick={manageAddItem}>Add Item</button>

        </div>
      </div>

    </>
  )
}

export default Store