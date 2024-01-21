import { useState } from 'react';
import { useEffect } from 'react';
import NewsComp from './NewsComp';
import NewsShimmer from './NewsShimmer';

function News() {
    let [topheadlines, setTopHeadlines] = useState(null)
    let [tradeeverything, settradeeverything] = useState(null)
    const apiKey1 = "1984ce589f14415ab52bbfa45a1f5e42"
    const apiKey2 = "35a3f7d79b8a40dc964f7fdd6303bf85"
    useEffect(()=>{
      let tophead = "https://newsapi.org/v2/top-headlines?q=trading&apiKey="+apiKey1
      // getApi(url)
      fetch(tophead)
      .then((res)=>res.json())
      .then((obj)=>setTopHeadlines(obj))
    },[])
    useEffect(()=>{
        let every = "https://newsapi.org/v2/everything?q=trading&apiKey="+apiKey1
        fetch(every)
        .then((res) => res.json(.3))
        .then((obj)=>settradeeverything(obj))

    },[])

      if(!topheadlines || !tradeeverything || topheadlines.articles===undefined || tradeeverything.articles === undefined){
        return(
          <div className='container my-8'>
            <div className="con" style={{display:'flex', justifyContent:'center'}}>
              <div className="heading" style={{textAlign:'center', width:'300px', height:'50px', backgroundColor:'gray'}}></div>
            </div>
            <div className="con" style={{display:'flex', justifyContent:'start'}}>
              <div className="heading" style={{textAlign:'center', width:'300px', height:'50px', backgroundColor:'gray'}}></div>
            </div>
            <div className="row">
            {
                Array.from({length:8}).map((el, i)=>{
                  return(
                    <div key={i} className="col-md-3 my-2">
                      <NewsShimmer/>
                    </div>
                  )
                })
              }
            </div>
          <div className='container my-4'>
          <div className="con" style={{display:'flex', justifyContent:'start'}}>
              <div className="heading" style={{textAlign:'center', width:'300px', height:'50px', backgroundColor:'gray'}}></div>
            </div>
            <div className="row">
              {
                Array.from({length:20}).map((el, i)=>{
                  return(
                    <div key={i} className="col-md-3 my-2">
                      <NewsShimmer/>
                    </div>
                  )
                })
              }
            </div>
          </div>
          </div>
        )
      }


    return (
      <div className="container my-4">
        <h2 style={{textAlign:'center'}}>Trade Market</h2>
          {
            topheadlines && topheadlines.articles.length > 0 && 
            <div className="row">
              <h3>Top-Headlines</h3>
              {
                topheadlines.articles.map((data)=>{
                  return (
                    data.urlToImage && data.title && data.description && data.url &&
                    <div key={data.publishedAt} className="col-md-3 my-2">
                      <NewsComp image = {data.urlToImage} heading={data.title} desc={data.description} url={data.url}/>
                    </div>
                  )
                })
              }
            </div>
          }

          {
            tradeeverything && tradeeverything.articles.length > 0 && 
            <div className="row">
            <h3>All News</h3>
              {
                tradeeverything.articles.map((data)=>{
                  return (
                    data.urlToImage && data.title && data.description && data.url &&
                    <div key={data.publishedAt} className="col-md-3 my-2">
                      <NewsComp image = {data.urlToImage} heading={data.title} desc={data.description} url={data.url}/>
                    </div>
                  )
                })
              }
            </div>
          }
      </div>
    );
  }

export default News;