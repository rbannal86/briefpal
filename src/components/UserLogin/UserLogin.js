import React, { Component } from 'react'
import config from '../../config'
import UserContext from '../../context/UserContext'

class UserLogin extends Component {
  static contextType = UserContext

  state = {
    user_name: '',
    error: '',
    logged_in: false
  }

  submitLogin = (e) => {
    const url = 'http://localhost:8000/api/auth/login'
    let user_name = document.getElementById('login-form-user_name').value
    let user_password = document.getElementById('login-form-user_password').value
    let body = {user_name: user_name, password: user_password}
    
    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)})
        .then(res => {
          if(!res.ok){
            res.json().then(e => {
              this.setState({
                error: e.error
              })
            })
          } else {
            window.localStorage.setItem(config.TOKEN_KEY, '')
            window.localStorage.setItem('user_name', '')
            res.json()
              .then(res => {
                window.localStorage.setItem('user_name', user_name)
                window.localStorage.setItem(config.TOKEN_KEY, res.authToken)
              })
              .then(this.props.handleLogIn)
              .then(this.props.history.push({
                pathname:('/')
              }))
          }
        })
  }


  render() {
    return(
      <div>
        <h3>USER LOGIN PAGE</h3>
        <form className='login-form' onSubmit={e => {
          e.preventDefault()
          this.submitLogin(e)}}>
          <div role='alert'>
            <p id='login-error'>{this.state.error}</p>
          </div>
          <div className='user_name'>
            <label htmlFor='login-form-user_name'>
              USER NAME
              <input required id='login-form-user_name' />
            </label>
          </div>
          <div className='user_password'>
            <label htmlFor='login-form-user_password'>
              PASSWORD
              <input required id='login-form-user_password' type='password'/>
            </label>
          </div>
          <button>SUBMIT</button>
        </form>
      </div>
    )
  }
}

export default UserLogin