import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import axios from 'axios'

import todo from '../assets/todo.png'
import logo from '../assets/logo.png'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { dispatch } = React.useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
        const res = await axios.post('http://localhost:5000/api/v1/login', { 
            username,
            password 
        })
        const { data } = res
      
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(data))
      
        // update the authContext
        dispatch({
          type: 'LOGIN',
          payload: data
        })
      } catch (err) {
        setError(err.response.data.message)
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
                        <Button disabled={isLoading}
                            className="mt-3 w-100"
                            type="submit"
                            variant="primary">Sign In</Button>
                        {error && <div className="error">{error}</div>}
                    </Form.Group>
                </Form>
                <div>
                    Don't have an account?
                    <Link to='/signup'>
                        <span className=''>
                            Sign Up
                        </span>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Login