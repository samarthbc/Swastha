import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import urlcontext from '../context/urlcontext'

function Blogitem() {
    
    const context = useContext(urlcontext)
    const {server_url} = context


    const [blog, setBlog] = useState([]);
    const { id } = useParams();

    const loadBlog = async () => {
        let response = await fetch(`${server_url}/api/blog/getblog/${id}`)
        let parsedBlog = await response.json();
        setBlog(parsedBlog)
    }

    useEffect(() => {
        loadBlog();
    }, [])

    return (
        <>
            <div className="container">
                <h2 className='text-center mt-4'>{blog.title}</h2>
                <h5 className="text-center mt-2">By: {blog.author}</h5>
                <p style={{fontSize:"20px"}}>{blog.date}</p>
                <p className="mt-5" style={{fontSize:"25px"}}>{blog.content}</p>
            </div>
        </>
    )
}

export default Blogitem