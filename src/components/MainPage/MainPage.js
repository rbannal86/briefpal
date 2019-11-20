import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MainPage extends Component {
  render() {
    return(
      <div className='main-page-content'>
        <Link to='/newletter'><button className='main-page-button'>Write A New Letter</button></Link>
        <Link to='/userpage'><button className='main-page-button'>Your Page</button></Link>
      </div>
    )
  }
}

export default MainPage