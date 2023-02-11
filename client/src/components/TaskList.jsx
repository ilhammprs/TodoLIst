import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { TaskContext } from "../context/task"
import TaskItem from './Task'

const TaskList = ({ activeCategory, activeCategoryTitle, user }) => {
    const { dispatch: dispatchTask } = React.useContext(TaskContext)
    const { dispatch: dispatchAuth } = React.useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [error, setError] = useState(null)
    const [newTask, setNewTask] = useState(null)
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/v1/tasks', {
            headers: {
              'Authorization': `Bearer ${user?.data.token}`
            }
          });
          setTaskList(response.data);
        } catch (error) {
          setError(error.response.data.err);
        }
      };
    
      fetchData();
    }, [user]);

    const task = { title, category_id: activeCategory }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:5000/api/v1/tasks', task, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.data.token}`
                }
            })

            setTitle('')
            setError(null)
            setNewTask(response.data)
        } catch (error) {
            setError(error.response.data.err)
        }
    }
    
    useEffect(() => {
        if (newTask) {
            dispatchTask({ type: 'CREATE_TASK', payload: newTask })
            setNewTask(null)
        }
    }, [newTask, dispatchTask])

    const handleLogout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatchAuth({
            type: 'LOGOUT'
        })
        dispatchTask({
            type: 'SET_TASKS',
            payload: null
        })
    }

    return (
        <div className='task-lists'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h2 className='fw-bold'>
                    {activeCategoryTitle !== '' ? activeCategoryTitle : 'All Tasks'}
                </h2>

                <div>
                    {user && <span className='me-3'>Hello, {user?.data.username}!</span>}
                    <button onClick={handleLogout} className='btn btn-outline-danger '>logout</button>
                </div>

            </div>
            {activeCategory !== '' && (
                <form className='w-100 mb-3' onSubmit={handleSubmit} >
                    <input
                        className='w-100 border-0 p-2'
                        style={{
                            background: '#eaeaea',
                            borderRadius: '8px'
                        }}
                        type="text"
                        value={title}
                        placeholder='Add a new task'
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </form>
            )}


            {taskList?.map(task => (
                <TaskItem
                    key={task._id}
                    task={task}
                    activeCategory={activeCategory}
                    user={user}
                />
            ))}

            {taskList?.length === 0 && (
                <div className='d-flex align-items-center justify-content-center' style={{
                    height: ' 400px',
                    fontSize: '30px',
                    color: '#aaa'

                }}>No task available</div>
            )}

            {error && <div className='error'>{error}</div>}
        </div>
    )
}

export default TaskList