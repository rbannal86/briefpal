import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import './Letters.css'

class Letters extends Component {
  static contextType = UserContext

  state = {
    conversation_id: this.props.location.state.conversation_id,
    letter_id: [].sort(),
    letter_count: 0,
    error: '',
    letter_one_content: '',
    letter_two_content: '',
    letter_three_content: '',
    letter_content: [],
    open_letters: []
  }

  handleLetterClick = (id) => {
    if(!this.state.open_letters.includes(id)) {
      this.setState({
        open_letters: [...this.state.open_letters, id]
      })
    } else {
      this.setState({
        open_letters: this.state.open_letters.filter(check => check !== id)
      })
    }
    
  }

  fetchLetters = (id, index) => {
    if(!id){
      return
    } else {
    const url = 'http://localhost:8000/api/letters/getletters/' + id
        fetch(url, {
          method: 'GET',
          header: {
            'content-type': 'application/json'
          }
        })
        .then(res => {
          if(!res.ok){
            this.setState({ error: res.error })
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(data => {
          this.setState({
            letter_content: [...this.state.letter_content, data.content]
          })
        })
    }
  }

  componentDidMount() {
    const url = 'http://localhost:8000/api/conversations/' + this.state.conversation_id
    fetch(url, {
      method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok){
        this.setState({ error: res.error })
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(data => {
      this.setState({
        letter_count: data.letter_count,
        letter_id: [data.letter_one, data.letter_two, data.letter_three]
      })
      return data
    })
    .then(data => {
      this.state.letter_id.map((id, index) => {
        this.fetchLetters(id, index)
        return data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  render() {
    return(
      <div>
        <h2>{this.context.user_name}'s Letters in Conversation {this.state.conversation_id}</h2>
        <ul>
          {this.state.letter_id.map((id, index) =>
    
            <li className='letter-list-item' key={index}>
              {this.state.letter_content[index] ?
                (<>
                  <button id={index} onClick={e => {
                    e.preventDefault()
                    this.handleLetterClick(id)
                  }}><h3 >Letter {index + 1}</h3></button>
                  <div>
                    {this.state.letter_content ? <p className={'letter-content ' + (this.state.open_letters.includes(id) ? 'show' : 'hidden')}>{this.state.letter_content[index]}</p> : <p></p>}
                    <Link to={{pathname: 'details/'+ id, state: {letter_count: this.state.letter_count, letter_index: index, letter_id: id, conversation_id: this.state.conversation_id}}}><button>Details</button></Link>
                  </div>
                </>) : <></> 
              }
            </li>)

          }
        </ul>
        <Link to='/userpage'><button>Return</button></Link>
      </div>
    )
  }
}

export default Letters