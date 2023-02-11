import SideBar from "../components/SideBar"
import React, { useEffect, useState, useContext } from "react"
import TaskList from "../components/TaskList"
import { CategoryContext } from "../context/category"
import { TaskContext } from "../context/task"
import { AuthContext } from "../context/auth"
import axios from 'axios'

const fetchTasks = async (dispatchTask, activeCategory, user) => {
    try {
        let url = 'http://localhost:5000/api/v1/tasks'
        if (activeCategory) {
            url = `http://localhost:5000/api/v1/tasks/category/${activeCategory}`
        }

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${user?.data.token}`
            }
        })

        if (response.status === 200) {
            dispatchTask({ type: 'SET_TASKS', payload: response.data })
        }
    } catch (error) {
        console.error(error)
    }
}

export const useLogout = () => {
    const { dispatch } = useContext(AuthContext)
    const { dispatch: dispatchCategory } = useContext(CategoryContext)
    const { dispatch: dispatchTask } = useContext(TaskContext)

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');

        //dispatch logout action
        dispatch({
            type: 'LOGOUT'
        });
        dispatchCategory({
            type: 'SET_CATEGORIES',
            payload: null
        })
        dispatchTask({
            type: 'SET_TASKS',
            payload: null
        })
    }

    return { logout }
}

const Home = () => {
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [activeCategoryTitle, setActiveCategoryTitle] = useState('');
    const { tasks, dispatch: dispatchTask } = useContext(TaskContext);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/v1/categories`, {
            headers: {
              "Authorization": `Bearer ${user?.data.token}`
            }
          });
  
          if (response.status === 200) {
            setCategories(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      if (user) {
        fetchData();
      }
    }, [user]);
  
    useEffect(() => {
      if (user) {
        fetchTasks(dispatchTask, activeCategory, user);
      }
    }, [activeCategory, dispatchTask, user]);

    return (
        <div className="home-container">
            <SideBar
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                setActiveCategoryTitle={setActiveCategoryTitle}
                user={user}
            />
            <div className="tasks-container">
                <TaskList tasks={tasks}
                    activeCategory={activeCategory}
                    activeCategoryTitle={activeCategoryTitle}
                    user={user}
                />
            </div>

        </div>
    )
}
export default Home