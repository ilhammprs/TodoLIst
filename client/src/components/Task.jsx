import React, { useEffect, useState } from "react"
import { TaskContext } from "../context/task"

import axios from 'axios';

const TaskItem = ({ task, activeCategory, user }) => {
  const { dispatch } = React.useContext(TaskContext)
  const [category, setCategory] = useState('')
  const [isChecked, setIsChecked] = useState(!task.is_active)

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await axios.get(`http://localhost:5000/api/v1/categories/${task.category_id}`, {
        headers: {
          'Authorization': `Bearer ${user?.data.token}`
        }
      })
      if (response.status === 200) {
        setCategory(response.data)
      }
    }
    fetchCategory()
  }, [task.category_id, user.token])

  const editedTask = { is_active: isChecked }

  const handleCheck = async () => {
    setIsChecked(!isChecked)

    const response = await axios.patch(`http://localhost:5000/api/v1/tasks/${task._id}`, editedTask, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user?.data.token}`
      }
    })

    if (response.status !== 200) {
      console.log(response.data.err)
    }

    if (response.status === 200) {
      console.log('task updated')
    }
  }

  const handleDelete = async () => {
    const response = await axios.delete(`http://localhost:5000/api/v1/tasks/category/${task._id}`, {
      headers: {
        'Authorization': `Bearer ${user?.data.token}`
      }
    })

    if (response.status === 200) {
      dispatch({ type: 'DELETE_TASK', payload: response.data })
    }
  }
    return (
        <div className={`task-item`} style={{ cursor: 'pointer' }}>
            <div className="d-flex">
                <input type="checkbox"
                    style={{
                        width: '20px', height: '20px',
                    }} className="me-3" checked={isChecked} onChange={handleCheck} />
            </div>

            <div className={`me-3 d-flex align-items-center flex-grow-1 `}>
                <div className={`task-title me-3 ${isChecked ? "done" : "todo"}`}>{task.title}</div>

                {activeCategory === '' && (
                    <div className="category-label rounded-pill" style={{
                        backgroundColor: 'pink'
                    }}>{category ? category.title : 'category'}</div>
                )}
            </div>
            <div className="">
                <span className="material-symbols-outlined delete" onClick={handleDelete}>delete</span>
            </div>
        </div>

    )
}

export default TaskItem