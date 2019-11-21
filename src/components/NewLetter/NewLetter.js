import React, { Component } from 'react'

class NewLetter extends Component {
  state = {
    content: '',
    user_name: '',
    user_id: '',
    error: '',
    first_letter: true
  }

  setContentValue = (input) => {
    this.setState({content: input})
  }

  setUserValue = (input) => {
    this.setState({user_name: input})
  }

  handleUser = () => {
    const url = 'http://localhost:8000/api/users/' + this.state.user_name + '/'
    console.log(url)
    fetch(url, {
      method: 'Get',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      if(!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      this.setState({
        user_id: data.id
      })
      return data
    })
    .catch(error => {
      console.log(error)
    })
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
          <label htmlFor='user-input'>
            <h3>Temporary user input</h3>
          </label>
          <input 
            placeholder='userOne'
            type='text'
            value={this.state.user_name}
            onChange={e => this.setUserValue(e.target.value)} />
            <button
              onClick={e => {
                e.preventDefault()
                this.handleUser()
              }}>
                Submit User Name
              </button>
        </form>
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