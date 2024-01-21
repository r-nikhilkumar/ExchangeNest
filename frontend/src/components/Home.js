import React from 'react'
import '../assets/Home.css'
import trading from '../assets/photos/trading.jpg'
import { Link } from 'react-router-dom'
export default function () {
  return (
    <div className='container-fluid'>
        <div className="getstarted">
            <div className="getstarted-left">
                <h4>Welcome, the ExchangeNest is going to provide you all about the trading. You can learn as well as earn, join the communities for realtime absolute guidence!</h4>
                <div>
                    <Link to="/profileSign" className="nav-items" ><div>Get Started</div></Link>
                </div>
            </div>
            <div className="getstarted-right">
                <img src={trading} alt="" height={'300vh'} width={'250vw'} />
            </div>
        </div>
    </div>
  )
}
