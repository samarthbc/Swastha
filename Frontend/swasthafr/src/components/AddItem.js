import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

function AddItem() {

    const Navigate = useNavigate()
    const [item, setItem] = useState([])
    const [itemfile, setItemfile] = useState()

    const handleAddItem = async(e) => {
        e.preventDefault()
        
        let response = await fetch("http://localhost:5000/api/shopitem/createitem",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            // body:JSON.stringify({name:item.name,description:item.description,manuDate:item.manuDate,expDate:item.expDate,mrp:item.mrp,sp:item.sp})
            body: JSON.stringify(item)
        })
        console.log(JSON.stringify({name:item.name,description:item.description,manuDate:item.manuDate,expDate:item.expDate,mrp:item.mrp,sp:item.sp}))
        let parsedResponse = await response.json()
        console.log(parsedResponse)
        let itemId = parsedResponse._id
        
        let formData = new FormData()
        formData.append('file',itemfile)

        await fetch(`http://localhost:5000/api/shopitem/updateimg/${itemId}`,{
            method:"POST",
            body: formData
        })
        Navigate('/store')
    }

    const fillvals = (e) => {
        setItem({...item, [e.target.name]: e.target.value})
    }

    const fillImg = (e) => {
        setItemfile(e.target.files[0])
    }


  return (
    <>
    <div className="container">

        <form>
            <label htmlFor="name" className='form-label'>Name:</label>
            <input type="text" id='name' name='name'className='form-control' value={item.name} onChange={fillvals}/>

            <label htmlFor="description" className='form-label'>Description:</label>
            <textarea name="description" id="description" cols="30" rows="10"className='form-control' value={item.description} onChange={fillvals}></textarea>

            <label htmlFor="manuDate" className='form-label'>Manufactured date:</label>
            <input type="datetime-local" id='manuDate' name='manuDate' className='form-control' value={item.manuDate} onChange={fillvals}/>

            <label htmlFor="expDate" className='form-label'>Expire Date:</label>
            <input type="datetime-local" id='expDate' name='expDate' className='form-control' value={item.expDate} onChange={fillvals}/>

            <label htmlFor="mrp" className='form-label'>MRP:</label>
            <input type="number" id="mrp" name='mrp' className='form-control' value={item.mrp} onChange={fillvals}/>

            <label htmlFor="sp" className='form-label'>Selling Price:</label>
            <input type="number" id='sp' name='sp' className='form-control' value={item.sp} onChange={fillvals}/>

            <label htmlFor="itemImg" className='form-label'>Item Image:</label>
            <input type="file" name="itemImg" id="itemImg" className='form-control' value={item.itemImg} onChange={fillImg}/>

            <button className="btn btn-success" type='submit' onClick={handleAddItem}>Add Item</button>
        </form>
    </div>
    </>
  )
}

export default AddItem