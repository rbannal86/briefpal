import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import NewLetterSent from './NewLetterSent'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
  
    <BrowserRouter>
      <Route>
        <NewLetterSent />
      </Route>
    </BrowserRouter>
    , div)
  ReactDOM.unmountComponentAtNode(div)
})