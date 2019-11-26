import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import ReplyPage from './ReplyPage'

it('renders without crashing', () => {
  const div = document.createElement('div')

  ReactDOM.render(
  
    <BrowserRouter>
      <Route>
        <ReplyPage history={{location:{state:{previous_content:''}}}}/>
      </Route>
    </BrowserRouter>
    , div)
  ReactDOM.unmountComponentAtNode(div)
})