import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

class MainPage extends Component {
  static contextType = UserContext

  state = {
    user_name: this.context.user_name,
    user_id: this.context.user_id,
    first_time: false
  }

  componentDidMount() {
    console.log(typeof this.props.location.state === 'undefined')
    if(typeof this.props.location.state !== 'undefined'){
      this.setState({
        first_time: true
      })
    } else {
      this.setState({
        first_time: false
      })
    }
  }

  render() {
    return(
      <div className='main-page-content'>
        {window.localStorage.user_name
          ?   (<div><h2>Hello, {window.localStorage.user_name}</h2>
              {this.state.first_time
              ? <Link to={{pathname:'/newletter', state: {first_letter: true}}}><button>Welcome. Ready to get started?</button></Link>
              : <Link to='/userpage'><button className='main-page-button'>Your Page</button></Link>}</div>)
          : <Link to='/about'><button className='main-page-button'>What Is This?</button></Link>}
        
      </div>
    )
  }
}

export default MainPage