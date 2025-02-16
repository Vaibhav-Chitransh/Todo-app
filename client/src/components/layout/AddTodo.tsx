import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ModeToggle } from "../ui/mode-toggle";
import api from "../../api/api";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const AddTodo = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/");
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [todos, setTodos]);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (task === "") {
      alert(`Input Field can't be empty`)
      return;
    }

    try {
      const res = await api.post("/", { text: task });
      setTodos([...todos, res.data]);
      setTask("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sticky top-0 bg-gray-800 py-3">
      <form onSubmit={(e) => submitHandler(e)}>
        <div className="flex justify-center items-center gap-2 my-2">
          <Input
            type="text"
            placeholder="Write Task here..."
            className="w-1/4 text-white font-bold"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-white text-black font-bold hover:bg-white"
          >
            Add
          </Button>
        </div>
      </form>
      <div className="absolute right-4 top-5">
        <ModeToggle />
      </div>
    </div>
  );
};

export default AddTodo;
