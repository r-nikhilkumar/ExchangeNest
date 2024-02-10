import React from 'react'

export default function MarketBlueprint() {
  return (
    <div className="card" style={{width: '18rem', height:'20rem'}}>
        <img height={'130vmin'} style={{backgroundColor:'gray',height:'20vmin'}}/>
        <div className="card-body">
            <div className="con my-1" style={{display:'flex', justifyContent:'center'}}>
                <div className="heading" style={{width:'40vmin', height:'4vmin', backgroundColor:'gray'}}></div>
            </div>
            <div className="con my-2" style={{display:'flex', justifyContent:'center'}}>
                <div className="heading" style={{width:'40vmin', height:'9vmin', backgroundColor:'gray'}}></div>
            </div>
            <div className="con my-2" style={{display:'flex', justifyContent:'start'}}>
                <div className="heading" style={{width:'8vmin', height:'5vmin', backgroundColor:'gray'}}></div>
            </div>
        </div>
    </div>
  )
}
