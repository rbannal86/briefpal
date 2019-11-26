import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import Letters from './Letters'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Route path={`/user/letters`}>
        <Letters />
      </Route>
    </BrowserRouter>
    , div)
  ReactDOM.unmountComponentAtNode(div)
})