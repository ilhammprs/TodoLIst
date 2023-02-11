import { createContext, useReducer } from "react";

export const CategoryContext = createContext();

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORIES":
      return {
        categories: action.payload,
      };
    case "CREATE_CATEGORY":
      return {
        categories: [...state.categories, action.payload],
      };
    case "DELETE_CATEGORY":
      return {
        categories: state.categories.filter((c) => c._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, {
    categories: [],
  });

  return (
    <CategoryContext.Provider value={{ state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};
