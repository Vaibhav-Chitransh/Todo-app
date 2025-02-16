import { Trash } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { EditTask } from "./EditTask";
import { Checkbox } from "../ui/checkbox";
import api from "../../api/api";
import { useEffect, useState } from "react";

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/")
      .then((response) => {
        setTodos(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [todos, setTodos]);

  const handleDelete = (item: string) => {
    api
      .delete(`/${item}`)
      .then((response) => {
        setTodos(todos.filter((todo) => todo._id !== item));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleToggleCompleted = async (item: Todo) => {
    try {
      const response = await api.put(`/${item._id}`, {
        text: item.text,
        completed: !item.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo._id === item._id ? response.data : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-1/2 flex flex-col gap-2 justify-start items-center mx-auto my-10 p-4">
      {todos.map((item, idx) => (
        <Card key={idx} className="w-full">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Checkbox checked={item.completed} onCheckedChange={() => handleToggleCompleted(item)} />
              <CardTitle className={item.completed ? "line-through w-full" : "w-full"}>
                {item.text}
              </CardTitle>
            </div>
            <CardDescription>
              <EditTask
                tasks={todos}
                setTasks={setTodos}
                item={item}
                idx={idx}
              />
              <Button
                className="bg-red-600 hover:bg-red-500"
                size={"icon"}
                onClick={() => handleDelete(item._id)}
              >
                <Trash className="cursor-pointer" />
              </Button>
            </CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;
