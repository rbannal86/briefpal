import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import NewLetter from './NewLetter'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
  
    <BrowserRouter>
      <Route>
        <NewLetter location= {{ state: '' }}/>
      </Route>
    </BrowserRouter>
    , div)
  ReactDOM.unmountComponentAtNode(div)
})