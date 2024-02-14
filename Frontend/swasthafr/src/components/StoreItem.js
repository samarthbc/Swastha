import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cartContext from '../context/cartcontext'

function StoreItem(props) {
    const [qnty,setQnty] = useState(0)

    const context = useContext(cartContext)
    const {addItemInCart} = context;

    let {name,description,manuDate,expDate,mrp,sp,itemImg,id} = props

    const Navigate = useNavigate()
    const AddToCart = async(id) =>{
        if(localStorage.getItem('token')){
            addItemInCart(id,qnty)
        }
        else{
            Navigate('/login')
        }
    }

    const fillvalqnty = (e) => {
        setQnty(e.target.value)
    }

    return (
        <>
            <div className="card border border-rounded border-success" style={{ width: "18rem" }}>
                <img src={`http://localhost:5000/${itemImg}`} className="card-img-top" alt="..." style={{ width: "17.9rem", height: "16rem" }} />
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <h5 className='text-center text-danger' style={{ fontSize: "25px", marginBottom:"0" }}>{sp}</h5>
                    <h5 className='text-center text-success' style={{ fontSize: "16px", textDecoration: "line-through", marginTop:"0" }}>{mrp}</h5>
                    <div>
                        <label htmlFor="qnty" style={{display:"inline-block"}} className='me-2'>Quantity: </label>
                        <input type="number" id="qnty" className='form-control' style={{width:"4vw", display:"inline-block"}} placeholder='1' onChange={fillvalqnty} value={qnty}/>
                    </div>
                    <div className='mt-2'>
                        <Link to={`/item/${id}`} className="btn btn-primary btn-sm me-3">View Product</Link>
                        <button className="btn btn-primary btn-sm" onClick={()=>AddToCart(id)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreItem