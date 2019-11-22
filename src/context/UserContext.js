import React from 'react'

const UserContext = React.createContext({
  user_name: '',
  user_id: '',
  login: '',
  logged_in: false
})

export default UserContext