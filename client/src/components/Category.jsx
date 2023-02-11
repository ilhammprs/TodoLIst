import axios from 'axios';
import { useContext } from 'react'
import { CategoryContext } from "../context/category"
import { TaskContext } from "../context/task"

const CategoryItem = ({ category, activeCategory, setActiveCategory, setActiveCategoryTitle, user }) => {
  const { dispatch: dispatchCategory } = useContext(CategoryContext)
  const { dispatch: dispatchTask } = useContext(TaskContext)

  const handleDeleteCategory = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/categories/${category._id}`, {
        headers: {
          'Authorization': `Bearer ${user?.data.token}`
        }
      });

      if (response.status === 200) {
        if (activeCategory === category._id) {
          setActiveCategory('')
          setActiveCategoryTitle('')
        }

        dispatchCategory({ type: 'DELETE_CATEGORY', payload: category._id })
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleDeleteTasks = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/tasks/category/${category._id}`, {
        headers: {
          'Authorization': `Bearer ${user?.data.token}`
        }
      });

      if (response.status === 200) {
        dispatchTask({ type: 'DELETE_TASKS_BY_CATEGORY', payload: category._id })
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = () => {
    handleDeleteTasks()
    handleDeleteCategory()
  }
  
return (
    <div className={`category-item  ${activeCategory === category._id && "sidebar-active"}`}>


        <div onClick={() => {
            setActiveCategory(category._id)
            setActiveCategoryTitle(category.title)

        }} >{category.title}</div>
        <div>
            <span className="delete material-symbols-outlined" onClick={handleDelete}>delete</span>
        </div>

    </div>

)

}

export default CategoryItem