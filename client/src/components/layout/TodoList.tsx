import { Trash } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { EditTask } from "./EditTask"
import { Checkbox } from "../ui/checkbox"

type TodoListProps = {
    items: string[],
    setItems: (items: string[]) => void
}

const TodoList : React.FC<TodoListProps> = ({items, setItems}) => {
    const handleDelete = (item : string) => {
        const newTodo = items.filter((text) => text !== item);
        setItems(newTodo);
    }

  return (
    <div className="w-1/2 flex flex-col gap-2 justify-start items-center mx-auto my-10 p-4">
      {
        items.map((item, idx) => (
            <Card key={idx} className="w-full">
                <CardHeader>
                    <div className="flex items-center gap-4">
                      <Checkbox />
                      <CardTitle className="w-full">{item}</CardTitle>
                    </div>
                    <CardDescription>
                        <EditTask todos={items} setTodos={setItems} item={item} idx={idx} />
                        <Button className="bg-red-600 hover:bg-red-500" size={'icon'} onClick={() => handleDelete(item)} ><Trash className="cursor-pointer" /></Button>
                    </CardDescription>
                </CardHeader>
            </Card>
        ))
      }
    </div>
  )
}

export default TodoList
