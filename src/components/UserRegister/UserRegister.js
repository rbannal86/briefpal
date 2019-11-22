import React, { Component } from 'react'
import config from '../../config'

class UserRegister extends Component {
  state ={
    error: '',
    user_name: '',
  }

  submitRegister = (e) => {
    const url = 'http://localhost:8000/api/register'
    let user_name = document.getElementById('register-form-user_name').value
    let password = document.getElementById('register-form-user_password').value
    
    let body = { user_name: user_name, password: password}
    console.log(body)
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(res => {
      if(!res.ok) {
        res.json().then(e => {
          this.setState({
            error: e.error
          })
        })
      } else {
        res.json()
          .then(res => {
            console.log(user_name)
            window.localStorage.setItem(config.TOKEN_KEY, res)
            window.localStorage.setItem('user_name', user_name)
          })
          .then(res => {
            this.setState({
              user_name: user_name
            })
          })
          .then(this.props.handleLogIn)
          .then(this.props.history.push({
            pathname:('/'),
            state:{ first_letter: true, user_name: user_name, user_id: window.localStorage.user_id }
          }))
      }
    })
  }

  render() {
    return(
      <div>
        <h3>USER REGISTER PAGE</h3>
        <form className='register-form' onSubmit={e => {
          e.preventDefault()
          this.submitRegister()}}>
        <div role='alert'>
          <p id='register-error'>{this.state.error}</p>
        </div>
        <div className='user_name'>
          <label htmlFor='register-form-user_name'>
            USER NAME
            <input required id='register-form-user_name' />
          </label>
        </div>
        <div className='user_password'>
          <label htmlFor='register-form-user_password'>
            PASSWORD
            <input required id='register-form-user_password' />
          </label>
        </div>
        <button>REGISTER</button>
        </form>
      </div>
    )
  }
}

export default UserRegister