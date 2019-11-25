import React, { Component } from 'react'
import config from '../../config'
import './UserRegister.css'

class UserRegister extends Component {
  

  state ={
    error: '',
    user_name: '',
  }

  _isMounted = false


  submitRegister = (e) => {
    const url = config.API_ENDPOINT + 'api/register'
    let user_name = document.getElementById('register-form-user_name').value
    let password = document.getElementById('register-form-user_password').value

    
    if(password.length < 6){
      this.setState({
        error: 'password must be six or more characters.'
      })
    } else{
      let body = { user_name: user_name, password: password}
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
            window.localStorage.setItem(config.TOKEN_KEY, res)
            window.localStorage.setItem('user_name', user_name)
          })
          .then(res => {
            if(this._isMounted) {
              this.setState({
              user_name: user_name
            })}
            
          })
          
          .then(this.props.history.push({
            pathname:('/'),
            state:{ first_letter: true, user_name: user_name, user_id: window.localStorage.user_id }
          }))
          .then(this.props.handleLogIn)
      }
    })
    .catch(error => console.log(error))
    }
    
    
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    return(
      <div>
        <h3>register here to begin writing letters</h3>
        <form className='register-form' onSubmit={e => {
          e.preventDefault()
          this.submitRegister()}}>
        <div role='alert'>
          <p id='register-error'>{this.state.error}</p>
        </div>
        <div className='user_name'>
          <label htmlFor='register-form-user_name'>
            user name
            <input required id='register-form-user_name' className='form-input'/>
          </label>
        </div>
        <div className='user_password'>
          <label htmlFor='register-form-user_password'>
            password
            <input required id='register-form-user_password' className='form-input' type='password'/>
          </label>
        </div>
        <button id='register-button'>register</button>
        </form>
      </div>
    )
  }
}

export default UserRegister