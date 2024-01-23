import React from 'react'
import moment from 'moment'

export default function NewsComp(props) {
  return (
    <div className="card">
        <img className="card-img-top" src={props.image} alt="news cap" height={'130vmin'}/>
        <div className="card-body">
            <h5 className="card-title" style={{WebkitBoxLines:'2',textOverflow:'ellipsis', whiteSpace:'nowrap', overflow:'hidden'}}>{props.heading}</h5>
            <p className="card-text" style={{whiteSpace: 'balance', height:'70px', textOverflow:'ellipsis', overflow:'clip'}}>{props.desc}</p>
            <p>{moment(props.time).fromNow()}</p>
            <a href={props.url} className="btn btn-dark" target='_blank'>more</a>
        </div>
    </div>
  )
}
