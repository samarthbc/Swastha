import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Createblog.css';

function Createblog() {

    const [blogdet, setBlogdet] = useState([])
    const Navigate = useNavigate();

    const createblog = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:5000/api/blog/createblog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: blogdet.title, author: blogdet.author, topic: blogdet.topic, content: blogdet.content })
        })
        console.log(JSON.stringify({ title: blogdet.title, author: blogdet.author, topic: blogdet.topic, content: blogdet.content }))

        Navigate("/blog")
    }

    const fillval = (e) => {
        setBlogdet({ ...blogdet, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="nb-forbg">
                <h3 className="text-center pt-4">Create Blog</h3>
                <div className="d-flex justify-content-center" style={{ width: "100%", margin: "auto" }}>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label" style={{ width: "40vw" }}>Title</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" name="title" onChange={fillval} value={blogdet.title} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail2" className="form-label">Author</label>
                            <input type="text" className="form-control" id="exampleInputEmail2" name="author" onChange={fillval} value={blogdet.author} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail3" className="form-label">Topic</label>
                            <input type="text" className="form-control" id="exampleInputEmail3" name="topic" onChange={fillval} value={blogdet.topic} />
                        </div>
                        <label htmlFor="textarea" className="form-label">Content</label>
                        <textarea name="content" id="textarea" cols="30" rows="10" className="form-control" onChange={fillval} value={blogdet.content} minLength={5}></textarea>
                        <button type="submit" className="btn btn-primary mt-2 mb-5" onClick={createblog}>Create Blog</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Createblog