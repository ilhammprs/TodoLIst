import axios from 'axios' 
import React,{ useState, useEffect } from 'react' 
import { CategoryContext } from "../context/category" 
import CategoryItem from './Category'
const SideBar = ({ activeCategory, setActiveCategory, setActiveCategoryTitle, user }) => { 
    const { dispatch: dispatchCategory } = React.useContext(CategoryContext) 
    const [title, setTitle] = useState('') 
    const [error, setError] = useState(null) 
    const [categories, setCategories] = useState([]) 
    const [newCategory, setNewCategory] = useState(null)

useEffect(() => {
    if (newCategory) {
      dispatchCategory({ type: 'CREATE_CATEGORY', payload: newCategory })
      setNewCategory(null)
    }
  }, [newCategory, dispatchCategory])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/categories', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.data.token}`
          }
        })

        setCategories(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const category = { title }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/categories', category, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.data.token}`
        }
      })

      setTitle('')
      setError(null)
      setNewCategory(response.data)
    } catch (error) {
      setError(error.response.data.err)
    }
  }

    return (
        <div className='sidebar'>
            <div className='category-list'>
                <div className={`category-item ${activeCategory === "" && "sidebar-active"}`} onClick={() => {
                    setActiveCategory('')
                    setActiveCategoryTitle('')
                }
                }> All Tasks</div>
                {categories?.map((category) => (
                    <CategoryItem
                        key={category._id}
                        category={category}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        setActiveCategoryTitle={setActiveCategoryTitle}
                        user={user}
                    />
                ))}_
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        className='border-0'
                        style={{ cursor: 'pointer' }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} placeholder='+ New Category'
                        required
                    />
                    {error && <div className='error'>{error}</div>}
                </form>
            </div>
        </div>
    )
}

export default SideBar