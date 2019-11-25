import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import config from '../../config'
import './ReplyPage.css'

class ReplyPage extends Component {
  static contextType = UserContext

  state = {
    previous_content: this.props.history.location.state.previous_content,
    user_id: this.context.user_id,
    content: '',
    conversation_id: this.props.history.location.state.conversation_id
  }

  setContentValue = (input) => {
    this.setState({content: input})
  }

  handleSubmit = (user_id, content) => {
    user_id = user_id.toString(10)
    const url = config.API_ENDPOINT + 'api/conversations/' + this.state.conversation_id + '/reply'
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        content
      })
    })
    .then(res => {
      if(!res.ok){
        this.setState({ error: res.error })
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(() => {
      this.props.history.push({
        pathname:('/userpage')
      })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return(
      <div className='reply-content'>
        <h3>previous letter</h3>
        <p className='letter-content previous-letter'>{this.state.previous_content}</p>
        <h3>your response</h3>
        <form>
          <textarea 
            className='letter-content'
            placeholder="Dear Pal,"
            value={this.state.content}
            onChange={e => this.setContentValue(e.target.value)}
          ></textarea>
          <div id="submit-buttons">
            <button 
            type="submit"
            onClick={e => {
              e.preventDefault()
              this.handleSubmit(this.state.user_id, this.state.content)
            }}
            >Send</button>
            <Link to='/userpage'><button type="reset">Cancel</button></Link>
          </div>
        </form>
      </div>
    )
  }
}

export default ReplyPage