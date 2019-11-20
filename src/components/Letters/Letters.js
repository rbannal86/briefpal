import React, { Component } from 'react'

class Letters extends Component {
  state = {
    conversation_id: this.props.location.state.conversation_id,
    letter_id: [],
    letter_count: 0,
    error: '',
    letter_one_content: '',
    letter_two_content: '',
    letter_three_content: '',
    letter_content: []
  }

  fetchLetters = (id, index) => {
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
      // if(index === 0){
      //   this.setState({ letter_content: data.content })
      // }
      // if(index === 1){
      //   this.setState({ letter_two_content: data.content })
      // }
      // if(index === 2){
      //   this.setState({ letter_three_content: data.content })
      // }
      let updateArray = this.state.letter_content
      updateArray.push(data.content)
      this.setState({
        letter_content: updateArray
      })
    })
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
        <h2>This will display all of the letters in the conversations</h2>
        <ul>
          {this.state.letter_id.map((id, index) => 
          <li className='letter-list-item' key={index}>
            <button><h3>Letter {index + 1}</h3></button>
            <div>
              <p className='letter-content'>{this.state.letter_content[index]}</p>
            </div>
          </li>)}
        </ul>
      </div>
    )
  }
}

export default Letters