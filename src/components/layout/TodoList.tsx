import { Pencil, Trash } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

type TodoListProps = {
    items: string[],
    setItems: (items: string[]) => void
}

const TodoList : React.FC<TodoListProps> = ({items, setItems}) => {
    const handleDelete = (item : string) => {
        const newTodo = items.filter((text) => text !== item);
        setItems(newTodo);
    }

    const handleEdit = () => {
        
    }

  return (
    <div className="border w-1/2 flex flex-col gap-2 justify-start items-center mx-auto my-10 p-4">
      {
        items.map((item, idx) => (
            <Card key={idx} className="w-full">
                <CardHeader>
                    <CardTitle>{item}</CardTitle>
                    <CardDescription>
                        <Button size={'icon'} className="bg-green-600 hover:bg-green-500" onClick={() => handleEdit()}><Pencil className="cursor-pointer" /></Button>
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
