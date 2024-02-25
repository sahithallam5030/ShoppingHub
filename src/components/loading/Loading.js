import React from 'react'
import './Loading.css'

function Loading() {
  return (
    <div>
      <div className="loader-box">   
        <div className="inner">
            <h1 className='mb-5 text-light text-center'>Loading...</h1>
            <div className="orbit">
                <div className="planet"></div>
                <div className="sun"></div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Loading
