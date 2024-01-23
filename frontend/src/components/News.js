import { useContext, useState } from 'react';
import { useEffect } from 'react';
import NewsComp from './NewsComp';
import NewsShimmer from './NewsShimmer';
// import { LoaderContext } from '../Contexts/UseProgress';
// import InfiniteScroll from 'react-infinite-scroll-component'

function News(props) {
    const [topheadlines, setTopHeadlines] = useState(null)
    const [tradeeverything, settradeeverything] = useState(null)

    useEffect(()=>{
      // loader.setLoadProg(10)
      props.loading.setLoad(3)
      let tophead = "http://127.0.0.1:3001/api/news"
      fetch(tophead)
      .then((res)=>{
        return res.json()
      })
      .then((obj)=>{
        setTopHeadlines(obj)
      })
      // loader.setLoadProg(50)
    },[])
    useEffect(()=>{
      // loader.setLoadProg(70)
      props.loading.setLoad(70)
        let every = "http://127.0.0.1:3001/api/allNews"
        fetch(every)
        .then((res) => {
          return res.json()
        })
        .then((obj)=>{settradeeverything(obj)
          // loader.setLoadProg(100)
          props.loading.setLoad(100)
        })

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
                      <NewsComp image = {data.urlToImage} heading={data.title} desc={data.description} url={data.url} time={data.publishedAt}/>
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
                tradeeverything.articles.map((data, i)=>{
                  return (
                    data.urlToImage && data.title && data.description && data.url &&
                    <div key={i} className="col-md-3 my-2">
                      <NewsComp image = {data.urlToImage} heading={data.title} desc={data.description} url={data.url} time={data.publishedAt}/>
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