import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'

class UserPage extends Component {
  static contextType = UserContext

  state = {
    user_id: this.context.user_id,
    user_name: this.context.user_name,
    conversations: [].sort(),
    error: ''
  }

  componentDidMount() {
    const url = 'http://localhost:8000/api/users/' + this.state.user_name + '/conversations'
    console.log(url)
    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }})
      .then(res => {
        if(!res.ok){
          this.setState({ error: res.error })
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => {
        this.setState({
          conversations: data.conversations
        })
        return data
      })
      .catch(error => {
        console.log(error)
      })
    }

  render() {    
    return(
      <div>
        <h2>{this.state.user_name}'s Page</h2>
        <ul>
          {this.state.conversations
          ?  this.state.conversations.map((id, index) => <li className='conversation-tab' key={id}><Link to={{pathname: '/user/letters', state:{conversation_id: id}}}><button>Conversation {index + 1}</button></Link></li>)
          : <></>
          }
        </ul>
        <Link to={{pathname: '/newletter', state: {first_letter: false}}}><button>Start A New Conversation</button></Link>
      </div>
    )
  }
}
export default UserPage