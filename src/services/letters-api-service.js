import config from '../config'

const LetterApiService = {
  getConversationsForUser() {
    return fetch(`${config.API_ENDPOINT}/`)
  }
}