import React from 'react'
import Background from "../assets/bg.mp4";
import GoBackButton from "./GoBackButton";
import "../App.css"
function Content({ setCurrentPage }) {
  return (
    <div className='start'>
        <video className="background-video" src={Background} autoPlay loop muted></video>
    </div>
  )
}

export default Content