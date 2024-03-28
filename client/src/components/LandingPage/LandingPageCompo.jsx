import React from 'react'
import { Link } from 'react-router-dom'
import "./styles.css"

const LandingPageCompo = () => {
  return (
    <>
      <header>
        <h3>Logo.</h3>
        <button><Link to={"login"} style={{textDecoration: "none", color: "#ffffff"}}>Login</Link></button>
      </header>
      <div className='landingPage'>
        <div className='posts'>
          <div className='post'>
            <img src="https://c4.wallpaperflare.com/wallpaper/201/410/351/5bf50ef157753-wallpaper-preview.jpg" alt="image" />
            <p className='username'>Adhiraj</p>
            <p className='postContent'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem pariatur animi id aperiam recusandae distinctio aliquam saepe suscipit architecto. Quos!</p>
            <button><Link to={"login"} style={{textDecoration: "none", color: "#ffffff", fontSize: "0.75rem"}}>View Post</Link></button>
          </div>
          <div className='post'>
            <img src="https://www.hdwallpaperslife.com/wp-content/uploads/2017/02/mi_vr_headset-wide-1920x1080.jpg" alt="image" />
            <p className='username'>Adhiraj</p>
            <p className='postContent'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem pariatur animi id aperiam recusandae distinctio aliquam saepe suscipit architecto. Quos!</p>
            <button><Link to={"login"} style={{textDecoration: "none", color: "#ffffff", fontSize: "0.75rem"}}>View Post</Link></button>
          </div>
          <div className='post'>
            <img src="https://filmdaily.co/wp-content/uploads/2020/04/vr-lede.jpg" alt="image" />
            <p className='username'>Adhiraj</p>
            <p className='postContent'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem pariatur animi id aperiam recusandae distinctio aliquam saepe suscipit architecto. Quos!</p>
            <button><Link to={"login"} style={{textDecoration: "none", color: "#ffffff", fontSize: "0.75rem"}}>View Post</Link></button>
          </div>
          <div className='post'>
            <img src="https://c4.wallpaperflare.com/wallpaper/201/410/351/5bf50ef157753-wallpaper-preview.jpg" alt="image" />
            <p className='username'>Adhiraj</p>
            <p className='postContent'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem pariatur animi id aperiam recusandae distinctio aliquam saepe suscipit architecto. Quos!</p>
            <button><Link to={"login"} style={{textDecoration: "none", color: "#ffffff", fontSize: "0.75rem"}}>View Post</Link></button>
          </div>
          <div className='post'>
            <img src="https://filmdaily.co/wp-content/uploads/2020/04/vr-lede.jpg" alt="image" />
            <p className='username'>Adhiraj</p>
            <p className='postContent'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem pariatur animi id aperiam recusandae distinctio aliquam saepe suscipit architecto. Quos!</p>
            <button><Link to={"login"} style={{textDecoration: "none", color: "#ffffff", fontSize: "0.75rem"}}>View Post</Link></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPageCompo