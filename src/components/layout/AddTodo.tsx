import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type addTodoHandlerProps = {
  addTodoHandler: (todoText: string) => void;
};

const AddTodo = ({ addTodoHandler }: addTodoHandlerProps) => {
  const [task, setTask] = useState<string>("");

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    if (task === "") {
      window.alertbox.render({
        alertIcon: "info",
        title: "Invalid Input",
        message: `Input field can't be empty`,
        btnTitle: "Ok",
        border: true,
      });
      return;
    }
    addTodoHandler(task);
    setTask("");
  };

  return (
    <form onSubmit={(e) => submitHandler(e)} className="sticky top-0 bg-gray-800 py-3">
      <div className="flex justify-center items-center gap-2 my-2">
        <Input
          type="text"
          placeholder="Write Task here..."
          className="w-1/4 text-white font-bold"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button type="submit" className="bg-white text-black font-bold hover:bg-white">Add</Button>
      </div>
    </form>
  );
};

export default AddTodo;
