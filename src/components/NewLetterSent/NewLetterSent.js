import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NewLetterSent.css'

class NewLetterSent extends Component {
  render() {
    return (
      <div className='newlettersent-content'>
        <div className='newlettersent-copy'><h4>congratulations.</h4> <p>your first letter has been sent. It's on its way 
          to a complete stranger (probably) and, with any luck, they'll
          send you something back.</p> <h4>enjoy your new conversation.</h4>
        </div>
        <Link to='/userpage'><button className='newlettersent-button'>user page</button></Link>
      </div>
    )
  }
}

export default NewLetterSent