import { NEXT_URL } from "../config"

const login = async (e, { username: identifier, password }) => {
  e.preventDefault()
  const res = await fetch(`${NEXT_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: identifier,
      password: password,
    }),
  })

  const data = await res.json()

  if (data.error) {
    throw `${data.error.message}`
  } else {
    return data
  }
}

const logout = async () => {
  return await fetch(`${NEXT_URL}/api/logout`, {
    method: "POST",
  })
}

const checkIfLoggedIn = async () => {
  const res = await fetch(`${NEXT_URL}/api/user`)

  return await res.json()
}

const loginService = {
  checkIfLoggedIn,
  logout,
  login,
}

export default loginService
