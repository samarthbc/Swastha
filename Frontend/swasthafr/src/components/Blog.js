import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import urlcontext from '../context/urlcontext'


function Blog() {
    
    const context = useContext(urlcontext)
    const {server_url} = context

    const Navigate = useNavigate()

    const createblog = (e) => {
        if (localStorage.getItem('token')) {
            Navigate('/createblog')
        }
        else {
            Navigate('/login')
        }
    }

    const [blogs, setBlogs] = useState([])

    const loadBlogs = async () => {
        let data = await fetch(`${server_url}/api/blog/getall`)
        let parsedData = await data.json()
        setBlogs(parsedData)
    }

    useEffect(() => {
        loadBlogs();
    }, [])

    return (

        <>
            <div className="container" style={{ position: "relative" }}>
                <h3 className='text-center mt-4 text-danger' style={{ fontFamily: "'Caveat', cursive", fontWeight: "bolder", fontSize: "40px" }}>Our blogs</h3>
                <button className='btn btn-warning btn-lg' onClick={createblog} style={{ position: "absolute", top: 0, right: 0 }}>Write a Blog <i className="fa-solid fa-feather"></i></button>
            </div>

            <div className="container mt-3">

                {blogs.slice().reverse().map((element) => {
                    let currdate = new Date()
                    let eldate = new Date(element.date)
                    return (
                        <div className="card border-success my-2" key={element._id}>
                            <div className="card-body">
                                <h5 className="card-title">{element.title} {'\u00A0'}{'\u00A0'}<span className='badge bg-danger'>{element.topic}</span></h5>
                                <p className="card-text">by: {element.author}</p>
                                <Link to={`/blogitem/${element._id}`} className="btn btn-sm btn-success">View Blog</Link>
                            </div>

                            {currdate-eldate<(1000*24*60*60) &&
                                <span className="badge text-bg-success top-0 start-100 position-absolute translate-middle rounded-pill">Trending <i className="fa-solid fa-fire"></i></span>
                            }


                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Blog