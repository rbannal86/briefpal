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
import LetterApiService from '../../services/letters-api-service'

class App extends Component {

  state = {
    user_name: window.localStorage.user_name,
    user_id: ''
  }

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
        user_id: this.state.user_id
      }}>
        <div className='App'>
          <header>
            <nav><Link to='/'><button>home</button></Link> | <button>register</button> | <Link to='/login'><button>login</button></Link></nav>
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
            <Route exact path='/login' component={UserLogin} />
          </main>
        </div>
      </UserContext.Provider>
    )
  }
}

export default App;