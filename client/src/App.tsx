import axios from "axios";
import React, { useEffect, useState } from "react";

type TodoList = {
  id: number;
  done: boolean;
  title: string;
  body: string;
};

function App() {
  const [todoList, setTodoList] = useState<TodoList[] | []>([]);

  const BASE_URL = "http://localhost:4000";

  const showAlert = (err: Error) => {
    alert(err);
  };

  const onLoadGetTodo = async () => {
    try {
      const { data } = await axios.get<TodoList[]>(`${BASE_URL}/api/todo`);
      setTodoList(data);
      console.log(data, "data");
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error);
      }
    }
  };

  const onClickMakeTodo = async () => {
    try {
      const server_query = {};
      await axios.post(`${BASE_URL}/api/todo`, server_query).then((res) => {
        console.log(res, "res");
      });
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error);
      }
    }
  };

  const onClickCheckTodoDone = async (id: number) => {
    try {
      await axios.post(`${BASE_URL}/api/todo/${id}/done`);
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error);
      }
    }
  };

  const onClickDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/api/todo/${id}`);
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error);
      }
    }
  };

  const displayTodos = () => {
    return todoList.map((el: TodoList) => {
      return <article key={el.id}>{el.body} </article>;
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
        <section>{displayTodos()}</section>
      </main>
    </div>
  );
}

export default App;
