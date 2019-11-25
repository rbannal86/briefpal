import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import config from '../../config'
import './LetterView.css'

class LetterView extends Component {
  static contextType = UserContext

  state = {
    conversation_id: this.props.history.location.state.conversation_id,
    id: this.props.match.params.id,
    user_id: this.context.user_id.toString(10),
    sender: '',
    recipient: '',
    error: '',
    content: ''
  }

  componentDidMount() {
    const url = config.API_ENDPOINT + 'api/letters/getletters/' + this.state.id
    fetch(url, {
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok){
        this.setState({ error: res.error})
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      this.setState({
        sender: data.sender,
        recipient: data.recipient,
        content: data.content
      })
    })
  }

  render() {
    return(
    <div className='letterview-content'>
      {(this.state.sender === this.state.user_id)
      ? <h4>you sent:</h4>
      : <h4>you received:</h4>
      }
      <p className='letter-content'>{this.state.content}</p>
      <div className='letter-nav-buttons'>
        {((this.state.sender === this.state.user_id) || (this.props.history.location.state.letter_count > this.props.location.state.letter_index + 1)) ?  <></> : <Link to={{pathname: '/reply', state:{previous_content: this.state.content, conversation_id: this.state.conversation_id}}}><button>Reply</button></Link>}
        <Link to={{pathname: '/user/letters', state: {conversation_id: this.state.conversation_id}}}><button className='back-button'>Back</button></Link>
      </div>
    </div>
    )

  }
}

export default LetterView