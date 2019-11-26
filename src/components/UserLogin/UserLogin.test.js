import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import UserLogin from './UserLogin'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
  
    <BrowserRouter>
      <Route>
        <UserLogin />
      </Route>
    </BrowserRouter>
    , div)
  ReactDOM.unmountComponentAtNode(div)
})