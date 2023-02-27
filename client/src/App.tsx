import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";

type TodoList = {
  name: string;
  id: number;
  isDone: boolean;
};

function App() {
  const [todoList, setTodoList] = useState<
    TodoList[] | AxiosResponse<TodoList[]>
  >([]);

  const BASE_URL = "http://localhost:4000";

  const onLoadGetTodo = async () => {
    try {
      const data = await axios.get(`${BASE_URL}/api/todo`);
      console.log(todoList, "todolist");
      setTodoList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickMakeTodo = async () => {
    try {
      const server_query = {};
      await axios.post(`${BASE_URL}/api/todo`, server_query).then((res) => {
        console.log(res, "res");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickCheckTodoDone = async (id: number) => {
    await axios.post(`${BASE_URL}/api/todo/${id}/done`);
  };

  const onClickDeleteTodo = async (id: number) => {
    await axios.delete(`${BASE_URL}/api/todo/${id}`);
  };

  const displayTodos = () => {
    todoList.map((el: TodoList) => {
      // return <article key={el.id}>{el}</article>;
    });
  };

  useEffect(() => {
    onLoadGetTodo();
  }, []);

  return (
    <div className="todo-body">
      <main className="todo-main">
        <section className="flex justify-between">
          <div>1</div>
          <div>2</div>
        </section>
        <section>{todoList}</section>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
