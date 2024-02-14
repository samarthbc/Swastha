import React, { useContext, useEffect, useState } from 'react'
import cartContext from '../context/cartcontext'

function ViewCart(props) {
    const context = useContext(cartContext)
    const { cart, addItemInCart, setCart } = context

    let allItems = []
    const [finalAllItemsToReRender, setFinalAllItemsToReRender] = useState([])

    const Loadcart = async () => {
        let counter = 1;
        console.log(cart)
        for (let id in cart) {
            let item = await getByItem(id)
            item['qnty'] = cart[id]
            item['counter'] = counter
            allItems.push(item)
            counter = counter + 1
        }
        setFinalAllItemsToReRender(allItems)
    }

    const getByItem = async (id) => {
        let response = await fetch("http://localhost:5000/api/shopitem/getone", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ id: id })
        })
        let item = await response.json()
        return (item)
    }

    const handleDeleteCart = (e) => {
        setCart([])
        setFinalAllItemsToReRender([])
    }

    useEffect(() => {
        Loadcart()
    }, [])

    let total = 0;

    return (
        <>
            <h3 className="text-danger text-center mt-3 nb-check" style={{ fontFamily: "'Caveat', cursive", fontWeight: "bolder", fontSize: "40px" }}>Your Cart</h3>


            {(finalAllItemsToReRender.length > 0) ? (
                <div>
                    <div className="container d-flex justify-content-end">
                        <button className="btn btn-danger mb-2" onClick={handleDeleteCart}>Empty Cart <i class="fa-solid fa-trash"></i></button>
                    </div>

                    <div className="container my-4">

                        <div className="row">
                            <div className="col-2">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>SNo.</div>
                            </div>
                            <div className="col-4">
                                <div className=" px-2 py-2" style={{ fontWeight: "bolder" }}>Name</div>
                            </div>
                            <div className="col-2">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>Quantity</div>
                            </div>
                            <div className="col-2">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>Price per item</div>
                            </div>
                            <div className="col-2">
                                <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>Price</div>
                            </div>
                        </div>

                        {/* Here cart looping comes */}
                        {finalAllItemsToReRender.map((element) => {
                            { total = total + element.qnty * element.sp }
                            return (
                                <div className="row">
                                    <div className="col-2">
                                        <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>{element.counter}</div>
                                    </div>
                                    <div className="col-4">
                                        <div className=" px-2 py-2" style={{ fontWeight: "bolder" }}>{element.name}</div>
                                    </div>
                                    <div className="col-2">
                                        <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>{element.qnty}</div>
                                    </div>
                                    <div className="col-2">
                                        <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>{element.sp}</div>
                                    </div>
                                    <div className="col-2">
                                        <div className="px-2 py-2" style={{ fontWeight: "bolder" }}>{element.qnty * element.sp}</div>
                                    </div>
                                </div>
                            )
                        })}

                        <h5 className="container mt-3 text-center">Total Price: {total}</h5>

                        <div className="container d-flex justify-content-around">
                            <button className="btn btn-success mt-4">Buy Cart <i class="fa-solid fa-bag-shopping"></i></button>
                        </div>

                    </div>
                </div>
            ) : (
                <div>
                    <h5 className="text-center text-danger mt-5">YOUR CART IS EMPTY</h5>
                    <p className='text-center' style={{fontSize:"20px"}}>Add items in cart to view here</p>
                </div>
            )}
        </>
    )
}

export default ViewCart