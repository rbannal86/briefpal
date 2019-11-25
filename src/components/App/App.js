import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import NewLetter from '../NewLetter/NewLetter'
import MainPage from '../MainPage/MainPage'
import NewLetterSent from '../NewLetterSent/NewLetterSent'
import UserPage from '../UserPage/UserPage'
import Letters from '../Letters/Letters'
import LetterView from '../LetterView/LetterView'
import ReplyPage from '../ReplyPage/ReplyPage'
import UserLogin from '../UserLogin/UserLogin'
import UserContext from '../../context/UserContext'
import UserRegister from '../UserRegister/UserRegister'
import About from '../About/About'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.handleLogIn = this.handler.bind(this)
  }

  handler = () => {
    this.setState({
      logged_in: true,
      user_name: window.localStorage.user_name,
      user_id: this.handleUserId()
    })
  }

  handleUserId = () => {
    let user_name = window.localStorage.user_name
      const url = 'http://localhost:8000/api/users/' + user_name
      fetch(url, {
        method: 'GET',
        headers: {'content-type': 'application/json'}
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
      })}

  state = {
    user_name: window.localStorage.user_name,
    user_id: '',
    logged_in: false,
  }

  logout = (e) => {
    // e.preventDefault()
    window.localStorage.removeItem('client_auth_token')
    window.localStorage.removeItem('user_name')
    this.setState({
      logged_in: false,
      user_name: '',
      user_id: ''
    })
  }

  componentDidMount() {
    if(window.localStorage.user_name){
      this.setState({
        logged_in: true,
        user_name: window.localStorage.user_name,
      })  
      let user_name = window.localStorage.user_name
      const url = 'http://localhost:8000/api/users/' + user_name
      fetch(url, {
        method: 'GET',
        headers: {'content-type': 'application/json'}
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
      })}
  }

  render() {
    return (
      <UserContext.Provider value={{
        user_name: this.state.user_name,
        user_id: this.state.user_id,
      }}>
        <div className='App'>
          <header className='header-content'>
              {(this.state.logged_in)
              ? <nav className='nav-bar-content'><Link to='/'><button className='nav-button'>home</button></Link> | <Link to='/'><button className='nav-button' onClick={e => this.logout(e)}>logout</button></Link></nav>
              : <nav className='nav-bar-content'><Link to='/'><button className='nav-button'>home</button></Link> | <Link to='/register'><button className='nav-button'>register</button></Link> | <Link to='/login'><button className='nav-button'>login</button></Link></nav>}
            <h1 className='header-copy'>briefPal</h1>
            <h4 className='header-copy'>anonymous letter writing.</h4>
          </header>
          <main >
            <Route exact path='/' component={MainPage} />
            <Route exact path='/newletter' component={NewLetter} />
            <Route exact path='/newlettersent' component={NewLetterSent} />
            <Route exact path='/userpage' component={UserPage} />
            <Route exact path='/user/letters' component={Letters} />
            <Route exact path='/user/details/:id' component={LetterView} />
            <Route exact path='/reply' component={ReplyPage} />
            <Route exact path='/login' render={(props) => <UserLogin {...props} handleLogIn = {this.handleLogIn} />}/>
            <Route exact path='/register' render={(props) => <UserRegister {...props} handleLogIn = {this.handleLogIn} />}/>
            <Route exact path='/about' component={About} />
          </main>
        </div>
      </UserContext.Provider>
    )
  }
}

export default App;