import cartContext from "./cartcontext";
import { useState } from "react";

const CartState = (props) =>{
    const [cart, setCart] = useState([])

    const addItemInCart = async(id,qnty) => {
        if(id in cart){
            let cartTemp = cart;
            cartTemp[id] = cartTemp[id] + qnty
            setCart(cartTemp)
        }
        else{
            let cartTemp = cart;
            cartTemp[`${id}`] = qnty;
            setCart(cartTemp);
        }
    }

    return(
        <cartContext.Provider value={{cart, addItemInCart, setCart}}>
            {props.children}
        </cartContext.Provider>
    )
}

export default CartState;