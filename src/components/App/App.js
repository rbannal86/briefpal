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

class App extends Component {

  state = {
    user_name: window.localStorage.user_name,
    user_id: '',
    logged_in: false,
  }

  logout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('client_auth_token')
    window.localStorage.removeItem('user_name')
    this.setState({
      logged_in: false
    })
  }

  // login = () => {
  //   this.setState({
  //     logged_in: true
  //   })
  // }

  componentDidMount() {
    if(window.localStorage.user_name)
      {let user_name = window.localStorage.user_name
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
        login: function login() {this.setState({logged_in: true})}
      }}>
        <div className='App'>
          <header>
              {(this.state.logged_in)
              ? <nav><Link to='/'><button>home</button></Link> | <button onClick={e => this.logout(e)}>logout</button></nav>
              : <nav><Link to='/'><button>home</button></Link> | <button>register</button> | <Link to='/login'><button>login</button></Link></nav>}
            <h1>briefPal</h1>
          </header>
          <main >
            <Route exact path='/' component={MainPage} />
            <Route exact path='/newletter' component={NewLetter} />
            <Route exact path='/newlettersent' component={NewLetterSent} />
            <Route exact path='/userpage' component={UserPage} />
            <Route exact path='/user/letters' component={Letters} />
            <Route exact path='/user/details/:id' component={LetterView} />
            <Route exact path='/reply' component={ReplyPage} />
            <Route exact path='/login' component={UserLogin}/>
          </main>
        </div>
      </UserContext.Provider>
    )
  }
}

export default App;