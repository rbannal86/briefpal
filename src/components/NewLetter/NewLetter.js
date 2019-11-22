import React, { Component } from 'react'
import UserContext from '../../context/UserContext'

class NewLetter extends Component {
  static contextType = UserContext

  state = {
    content: '',
    user_name: this.context.user_name,
    user_id: this.context.user_id,
    error: '',
    first_letter: true
  }

  setContentValue = (input) => {
    this.setState({content: input})
  }

  handleSubmit = (user_id, content) => {
    user_id = user_id.toString(10)
    const url = 'http://localhost:8000/api/letters/newletter'
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        content,
      }),
    })
    .then(res => {
      console.log(res)
      if(!res.ok){
        this.setState({error: res.error})
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(() => {
      if(this.state.first_letter){
        this.props.history.push({
        pathname:('/newlettersent')
        })
      } else {
        this.props.history.push({
          pathname:('/userpage')
        })
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount() {
    console.log(this.context.user_name)
    this.setState({
      user_name: this.context.user_name,
      user_id: this.context.user_id
    })
    if(!this.props.location.state.first_letter) {
      this.setState({
        first_letter: false
      })
    }
  }

  render() {
    return (
      <div className='New-Letter'>
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




export default NewLetter