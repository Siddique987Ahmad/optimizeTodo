import { ADD_TODO, DELETE_TODO, UPDATE_TODO, SET_TODOS } from "./actionTypes";
import { saveTodos, getTodos } from "../utils/storage";

export const addTodo = (todo) => async (dispatch, getState) => {
  dispatch({ type: ADD_TODO, payload: todo });
  await saveTodos(getState().todos);
};

export const deleteTodo = (id) => async (dispatch, getState) => {
  dispatch({ type: DELETE_TODO, payload: id });
  await saveTodos(getState().todos);
};

export const updateTodo = (updatedTodo) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_TODO, payload: updatedTodo });
  await saveTodos(getState().todos);
};

export const fetchTodos = () => async (dispatch) => {
  const todos = await getTodos();
  dispatch({ type: SET_TODOS, payload: todos });
};
