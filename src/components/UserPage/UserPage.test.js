import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import UserPage from './UserPage'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
  
    <BrowserRouter>
      <Route>
        <UserPage />
      </Route>
    </BrowserRouter>
    , div)
  ReactDOM.unmountComponentAtNode(div)
})