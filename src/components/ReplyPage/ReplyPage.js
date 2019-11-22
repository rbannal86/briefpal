import React, { Component } from 'react'
import UserContext from '../../context/UserContext'

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
    const url = 'http://localhost:8000/api/conversations/' + this.state.conversation_id + '/reply'
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
      <div>
        <h3>LETTER YOU ARE REPLYING TO</h3>
        <p>{this.state.previous_content}</p>
        <h3>REPLY TO THE LETTER</h3>
        <form>
          <textarea 
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
            <button type="reset">Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ReplyPage