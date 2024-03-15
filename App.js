import React, { useEffect } from "react";
import { Provider } from "react-redux";
import MainScreen from "./src/screens/MainScreen";
import store from "./src/store/ConfigureStore";
import { fetchTodos } from "./src/actions/todoActions";

export default function App() {
  useEffect(() => {
    store.dispatch(fetchTodos());
  }, []);
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}
