import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class About extends Component {
  render() {
    return(
      <div className='about-page-content'>
        <h2>What is briefPal?</h2>
        <p>briefPal is a pen-pal app with a few twists. Each new conversation
          you start ends up connecting you with a complete stranger. Your window
          for communication is short. After you send that first letter,
          your randomly assigned partner has one chance to reply. Once you
          receive your reply, you can send one more letter. That's it. In the short
          span of three letters, what kind of conversation can you have?
        </p>
        <Link to='/register'><button>Get Started</button></Link>
      </div>
    )
  }
}

export default About