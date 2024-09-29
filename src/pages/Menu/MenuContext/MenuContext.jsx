import React, { createContext, useContext, useReducer, useEffect } from 'react';

const MenuContext = createContext();

const initialState = {
  menu: [],
  loading: true,
  error: null,
};

function menuReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, menu: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function MenuProvider({ children }) {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  useEffect(() => {
    const fetchMenu = async () => {
      dispatch({ type: 'FETCH_START' });
      try {
        const response = await fetch('http://localhost:5000/menu');
        const data = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        console.error("Error fetching menu:", error);
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchMenu();
  }, []);

  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}