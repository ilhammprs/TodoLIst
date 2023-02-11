import React, { useState } from 'react'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import todo from '../assets/todo.png'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

const SignUp = () => {
  const { dispatch } = React.useContext(AuthContext)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:5000/api/v1/register', { 
        name, 
        phone, 
        username, 
        email,
        password 
    })
      const { data } = response

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(data))

      // update the authContext
      dispatch({
        type: 'LOGIN',
        payload: data
      })
    } catch (err) {
      setError(err.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

return (
    <div className='auth-page-container'>
        <div className='auth-brand'>
            <div className='mb-3'>
                <img src={logo} alt="logo" />
            </div>
            <div>
                <img src={todo} alt="todo" />
            </div>
        </div>
        <div className='auth-form'>
            <div>
                <h3>Welcome to To Do List</h3>
                <p>Please sign-in to your account, and start manage further</p>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="+62"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="example@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password" placeholder="....."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button disabled={isLoading} type="submit" variant="primary" className='mt-3 w-100'>Sign Up</Button>
                    {error && <div className='error'>{error}</div>}
                </Form.Group>
            </Form>
            <div>
                Already have an account?
                <Link to="/login">
                    <span>
                        Sign In
                    </span>
                </Link>
            </div>
        </div>

    </div>
)
}

export default SignUp
