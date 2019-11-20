import React from 'react';
import { Route, Link } from 'react-router-dom'
import NewLetter from '../NewLetter/NewLetter'
import MainPage from '../MainPage/MainPage'
import NewLetterSent from '../NewLetterSent/NewLetterSent'
import UserPage from '../UserPage/UserPage'
import Letters from '../Letters/Letters'

function App() {
  return (
    <div className='App'>
      <header>
        <nav><Link to='/'><button>home</button></Link> | <button>register</button> | <button>login</button></nav>
        <h1>briefPal</h1>
      </header>
      <main >
        <Route exact path='/' component={MainPage} />
        <Route exact path='/newletter' component={NewLetter} />
        <Route exact path='/newlettersent' component={NewLetterSent} />
        <Route exact path='/userpage' component={UserPage} />
        <Route exact path='/user/letters' component={Letters} />
      </main>
    </div>
  );
}

export default App;