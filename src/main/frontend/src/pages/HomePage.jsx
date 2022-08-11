import React from 'react';
import Header from "../components/Header";

function HomePage() {
  return (
    <div className='home-page'>
      <Header />

      <h1>Welcome to my User App</h1>
      <h3>Rebuilding Week 9 User App Inventory with full CRUD functionality</h3>
      <h4>FrontEnd: React.js & BackEnd: Java using Vert.x Framework</h4>

      <div className='homepage-images'>
        <img src='https://cdn.hashnode.com/res/hashnode/image/upload/v1622008722227/ResNcwZyph.png' alt='react.js' />
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Vert.x_Logo.svg/1200px-Vert.x_Logo.svg.png' alt='vert.x' />
      </div>
    </div>
  )
}

export default HomePage
