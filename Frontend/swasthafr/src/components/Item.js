import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import cartContext from '../context/cartcontext'

function Item() {

    const context = useContext(cartContext)
    const {addItemInCart} = context

    const [quantity, setQuantity] = useState(0)

    const [curitem, setCuritem] = useState([])
    const { id } = useParams()
    const loaditem = async () => {
        let response = await fetch("http://localhost:5000/api/shopitem/getone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        let parsedResponse = await response.json()
        setCuritem(parsedResponse)
    }

    useEffect(() => {
        loaditem()
    }, [])

    const Navigate = useNavigate()
    const handleAddToCart = async() => {
        if(localStorage.getItem('token')){
            addItemInCart(id,quantity)
        }
        else{
            Navigate('/login')
        }
    }

    const fillValsQnty = (e) => {
        setQuantity(e.target.value)
    }

    return (
        <div className="d-flex my-5 ms-5 justify-content-start">
            <img src={`http://localhost:5000/${curitem.itemImg}`} alt="Image" style={{ width: "40vw", height: "40vw" }} className='border rounded border-dark' />
            <div style={{ marginLeft: "40px", height: "40vw" }} className='d-flex flex-column justify-content-between py-5'>
                <div>
                    <h2>{curitem.name}</h2>
                    <p>{curitem.description}</p>
                </div>

                <div>
                    <p>Manufacture Date: {curitem.manuDate}</p>
                    <p>Expire Date: {curitem.expDate}</p>
                </div>

                <h4>{curitem.sp}</h4>

                <div>
                    <label htmlFor="qnty">Quantity:</label>
                    <input type="number" className='form-control border' style={{ width: "6vw" }} onChange={fillValsQnty} id='qnty' value={quantity}/>
                    <button className="btn btn-success mt-1" onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Item