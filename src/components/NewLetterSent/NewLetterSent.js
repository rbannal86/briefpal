import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NewLetterSent extends Component {
  render() {
    return (
      <div>
        <p>Congratulations. Your first letter has been sent. It's on its way 
          to a complete stranger (probably) and, with any luck, they'll
          send you something back. Enjoy your new conversation!
        </p>
        <Link to='/userpage'><button>User Page</button></Link>
      </div>
    )
  }
}

export default NewLetterSent