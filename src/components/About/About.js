import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

class About extends Component {
  render() {
    return(
      <div className='about-page-content'>
        <h2>What is briefPal?</h2>
        <div id='quotation'>
          <q id='hemingway-quotation'>Don't you like to write letters? I do because it's such a swell way to keep from working and yet feel you've done something.</q>
          <p id='quotation-attribution'>-Ernest Hemingway</p>
        </div>
        
        <div className='about-copy'></div>
        <p>briefPal is a pen-pal app with a few twists. Each new conversation
          you start ends up connecting you with a complete stranger.</p>
        <p>Your window
          for communication is short. After you send that first letter,
          your randomly assigned partner has one chance to reply. Once you
          receive your reply, you can send one more letter.</p> 
        <p>That's it.</p> 
        <p>In the short span of three letters, <span id='about-hook'>what kind of conversation can you have?</span></p>
      
        <Link to='/register'><button id='get-started-button'>get started here</button></Link>
      </div>
    )
  }
}

export default About