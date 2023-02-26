import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
type TodoList = {
  name: string;
  id: number;
  isDone: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<
    AxiosResponse<TodoList[]> | TodoList[]
  >([]);
  const BASE_URL = "http://localhost:4000";

  const getTodo = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/todo`);
      setTodoList(data);
      console.log(todoList, "todolist");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);
  return <h1>hello world!</h1>;
}

export default App;
