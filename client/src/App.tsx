import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsCircle, BsTrash, BsCircleFill } from "react-icons/bs";

type TodoList = {
  id: number;
  done: boolean;
  title: string;
  body: string;
};

function App() {
  const [todoList, setTodoList] = useState<TodoList[] | []>([]);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const BASE_URL = "http://localhost:4000";

  const showAlert = (err: Error | string) => {
    alert(err);
  };

  const onLoadGetTodo = async () => {
    try {
      const { data } = await axios.get<TodoList[]>(`${BASE_URL}/api/todo`);
      setTodoList(data);
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error);
      }
    }
  };

  const Len = (v: string | object) => {
    if (typeof v === "string") return v.length;
    if (Array.isArray(v)) return v.length;
    return 0;
  };

  const validateTodo = () => {
    if (Len(title) === 0) {
      showAlert("please type what you are going to do today");
      return false;
    }
    return true;
  };

  const onClickMakeTodo = async () => {
    if (!validateTodo()) {
      return;
    }

    try {
      const server_query = {
        title,
      };

      await axios.post(`${BASE_URL}/api/todo`, server_query);

      setTitle("");
      setShowInput(false);

      onLoadGetTodo();
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error);
      }
    }
  };

  const onClickCheckTodoDone = async (id: number) => {
    try {
      await axios.post(`${BASE_URL}/api/todo/${id}/done`);
      onLoadGetTodo();
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error);
      }
    }
  };

  const onClickDeleteTodo = async (id: number) => {
    try {
      await axios.delete(`${BASE_URL}/api/todo/${id}`);
      onLoadGetTodo();
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error);
      }
    }
  };

  const onClickDeleteAllTodo = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/todo`);
      onLoadGetTodo();
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error);
      }
    }
  };

  const displayTodos = () => {
    return todoList.map((el: TodoList) => {
      return (
        <article
          key={el.id}
          className="flex flex-row justify-between items-center text-gray todo-item"
        >
          <div className="flex items-center gap-2">
            <BsCircle />
            <span
              onClick={() => onClickCheckTodoDone(el.id)}
              className={`cursor-pointer ${el.done ? "todo-name" : ""}`}
            >
              {el.title}
            </span>
          </div>

          {el.done && (
            <BsTrash
              className="text-xl"
              onClick={() => onClickDeleteTodo(el.id)}
            />
          )}
        </article>
      );
    });
  };

  const onClickToggleAddInput = () => {
    setShowInput(!showInput);
  };

  useEffect(() => {
    onLoadGetTodo();
  }, []);

  return (
    <div className="todo-body flex-col">
      <div className="mb-4 todo-header text-center p-4">Todo List</div>
      <main className="todo-main relative">
        <section className="flex flex-col gap-2">{displayTodos()}</section>
        {showInput && (
          <div className="flex mt-3 gap-2">
            <input
              type="text"
              className="todo-add-input w-4/5"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <button
              onClick={onClickMakeTodo}
              className="flex justify-center items-center	todo-add-button w-1/5"
            >
              <AiOutlineCheck />
            </button>
          </div>
        )}
        <div className="m-0">
          <button
            className="absolute todo-add-btn"
            onClick={onClickToggleAddInput}
          >
            + New Task
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
