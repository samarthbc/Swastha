import React from 'react'

function NewsItems(props) {
  let {title, author, name, description, publishedAt, url, urlToImage} = props;
  return (
    <>
      <div className="card border-success" style={{width:"18rem"}}>
        <img src={urlToImage} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">Author: {author}</p>
            <p className="card-text">Souce: {name}</p>
            <p className="card-text">{description}</p>
            <p className="card-text text-secondary">{publishedAt}</p>
            <a href={url} target="_blank" className="btn btn-success">Read More</a>
          </div>
      </div>
    </>
  )
}

export default NewsItems