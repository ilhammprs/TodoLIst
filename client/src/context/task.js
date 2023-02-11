import { createContext, useReducer } from "react";

export const TaskContext = createContext()

export const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                tasks: action.payload
            }
        case 'CREATE_TASK':
            return {
                tasks: [action.payload, ...state.tasks]
            }
        case 'DELETE_TASK':
            return {
                tasks: state.tasks.filter((t) => t._id !== action.payload._id)
            }
        case 'DELETE_TASKS_BY_CATEGORY':
            return {
                tasks: state.tasks.filter((t) => t.category_id !== action.payload.category_id)
            }
        default:
            return state
    }
}

export const TaskContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: []
    })

    return (
        <TaskContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}