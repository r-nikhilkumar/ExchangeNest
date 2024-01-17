import { useState } from 'react';
import { useEffect } from 'react';
import NewsComp from './NewsComp';

function News() {
    let [object, setObj] = useState(null)
    useEffect(()=>{
      let url = "https://newsapi.org/v2/everything?q=stockmarket&apiKey=35a3f7d79b8a40dc964f7fdd6303bf85"
      // getApi(url)
      fetch(url)
      .then((res)=>res.json())
      .then((obj)=>setObj(obj))
    },[])
    
    return (
      <div className="container my-4">
        <h2 style={{textAlign:'center'}}>Stock Market</h2>
          {
            object && 
            <div className="row">
              {
                object.articles.map((data)=>{
                  return (
                    data.urlToImage && data.title && data.description && data.url && <div className="col-md-3 my-2">
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