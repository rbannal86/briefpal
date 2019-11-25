import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import config from '../../config'
import './UserPage.css'

class UserPage extends Component {
  static contextType = UserContext

  state = {
    user_id: this.context.user_id,
    user_name: this.context.user_name,
    conversations: [].sort(),
    error: ''
  }

  componentDidMount() {
    if(typeof this.state.user_name === 'undefined') {
      console.log('whoa')
      this.props.history.push({
        pathname:('/')
      })
    } else {
    console.log('nice')  
    const url = config.API_ENDPOINT + 'api/users/' + this.state.user_name + '/conversations'
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
      })}
    }

  render() {    
    return(
      <div className='conversations-content'>
        <h4>these are your conversations, {this.state.user_name}</h4>
        <ul className='conversation-list'>
          {this.state.conversations
          ?  this.state.conversations.map((id, index) => <li className='conversation-tab' key={id}><Link to={{pathname: '/user/letters', state:{conversation_id: id}}}><button className='conversation-button'>conversation {index + 1}</button></Link></li>)
          : <></>
          }
        </ul>
        <Link to={{pathname: '/newletter', state: {first_letter: false}}}><button className='newconversation-button'>start a new conversation</button></Link>
      </div>
    )
  }
}
export default UserPage