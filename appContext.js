import React, { useState, useContext } from 'react'

const initialUser = {
  id: '',
  username: '',
  karma: '',
  created_at: '',
}

export const UserContext = React.createContext({
  user: undefined,
  setUser: (user) => null,
})

export const useUser = () => useContext(UserContext)

export const UserProvider = (props) => {
  const { children } = props
  const [user, setUser] = useState(initialUser)

  const { Provider } = UserContext
  return <Provider value={{ user, setUser }}>{children}</Provider>
}
