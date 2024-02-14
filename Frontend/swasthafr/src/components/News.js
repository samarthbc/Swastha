import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'

function News() {

  const [articles, setArticles] = useState([])
  const [totalresults, setTotalresults] = useState(0)

  const [indarticles, setIndarticles] = useState([])
  const [indtotalresults, setIndtotalresults] = useState(0)

  const updateNews = async () => {
    const url = `https://newsapi.org/v2/everything?q=health&apiKey=a7742701b0824034b7519ea4cd424fe8&page=1&pageSize=100`

    let data = await fetch(url)
    let parsedData = await data.json()

    setArticles(parsedData.articles)
    setTotalresults(parsedData.totalResults)
  }

  const updateIndNews = async () => {
    const url = "https://newsapi.org/v2/top-headlines?q=health&country=in&apiKey=a7742701b0824034b7519ea4cd424fe8"

    let data = await fetch(url)
    let parsedData = await data.json()

    setIndarticles(parsedData.articles)
    setIndtotalresults(parsedData.totalResults)
  }

  useEffect(() => {
    updateIndNews()
    updateNews()
    //eslient-disable-next-line
  }, [])

  if(indtotalresults<=0){
    let elementchange = document.querySelector('.nb-check')
    if(elementchange){
    elementchange.style.display = 'none'
    }
  }


  return (
    <>
      <h3 className="text-danger text-center mt-3 nb-check" style={{fontFamily:"'Caveat', cursive", fontWeight:"bolder", fontSize:"40px"}}>Top Health Headlines in India</h3>
      <div className="container nb-check">
        <div className="row mt-4">
          {indarticles.map((element)=>{
            return (
              <div className="col-md-4 my-1">
                <NewsItems
                  title={element.title ? element.title : ""}
                  author={element.author ? element.author : "Unknown"}
                  name={element.source.name ? element.source.name : "Unknown"}
                  description={element.description ? element.description : ""}
                  publishedAt={element.publishedAt ? element.publishedAt : "Published recently"}
                  url={element.url}
                  urlToImage={element.urlToImage ? element.urlToImage : require("../static/bgis/Default_News.png")}
                />
              </div>
            )
          })}
        </div>
      </div>




      <h3 className='text-danger text-center mt-3' style={{fontFamily:"'Caveat', cursive", fontWeight:"bolder", fontSize:"40px"}}>Healthcare News Across the Globe <i class="fa-solid fa-globe"></i></h3>
      <div className="container">
        <div className="row mt-4">
          {articles.map((element) => {
            return (
              <div className="col-md-4 my-1">
                <NewsItems
                  title={element.title ? element.title : ""}
                  author={element.author ? element.author : "Unknown"}
                  name={element.source.name ? element.source.name : "Unknown"}
                  description={element.description ? element.description : ""}
                  publishedAt={element.publishedAt ? element.publishedAt : "Published recently"}
                  url={element.url}
                  urlToImage={element.urlToImage ? element.urlToImage : require("../static/bgis/Default_News.png")}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default News