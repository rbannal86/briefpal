import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LetterApiService from '../../services/letters-api-service'
import UserContext from '../../context/UserContext'

class LetterView extends Component {
  static contextType = UserContext

  state = {
    conversation_id: this.props.history.location.state.conversation_id,
    id: this.props.match.params.id,
    user_id: this.context.user_id,
    sender: '',
    recipient: '',
    error: '',
    content: ''
  }

  componentDidMount() {
    const url = 'http://localhost:8000/api/letters/getletters/' + this.state.id
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
    <div>
      <h3>This is a page for a specific letter</h3>
      <p>{this.state.content}</p>
      {((this.state.sender === this.state.user_id) || (this.props.history.location.state.letter_index + 1 <= this.props.history.location.state.letter_count)) ?  <></> : <Link to={{pathname: '/reply', state:{previous_content: this.state.content, conversation_id: this.state.conversation_id}}}><button>Reply</button></Link>}
      <Link to={{pathname: '/user/letters', state: {conversation_id: this.state.conversation_id}}}><button>Back</button></Link>
    </div>
    )

  }
}

export default LetterView

//this.props.history.location.state.letter_index + 1 < this.props.history.location.state.letter_count