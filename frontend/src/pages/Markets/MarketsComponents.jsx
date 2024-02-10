import React from 'react'
import moment from 'moment'

export default function MarketsComponents(props) {
  return (
    <div className="card">
        <img className="card-img-top" src={props.image} alt="news cap" style={{height:'20vmin'}}/>
        <div className="card-body">
            <h5 className="card-title h5 my-1" style={{WebkitBoxLines:'2',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden'}}>{props.heading}</h5>
            <p className="card-text p my-2" style={{whiteSpace: 'balance', height:'70px', textOverflow:'ellipsis', overflow:'clip'}}>{props.desc}</p>
            <p className='p my-1 h6'>{moment(props.time).fromNow()}</p>
            <a href={props.url} className="btn btn-dark my-1" target='_blank'>more</a>
        </div>
    </div>
  )
}
