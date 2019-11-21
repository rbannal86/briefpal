import config from '../config'

const LetterApiService = {
  getUserId(user_name) {
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
      console.log(data)
      return data
    })
  }
}

export default LetterApiService