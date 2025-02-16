import api from "@/api/api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import { useState } from "react"

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

type EditProps = {
    tasks: Todo[],
    setTasks: (tasks: Todo[]) => void,
    item: Todo,
    idx: number
}

export function EditTask({tasks, setTasks, item, idx} : EditProps) {
    const [newItem, setNewItem] = useState<Todo>({
      _id: item._id,
      text: item.text,
      completed: item.completed
    });

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSubmit = async () => {
        try {
          const response = await api.put(`/${newItem._id}`, {text: newItem.text, completed: newItem.completed});
          setTasks(
            tasks.map((task, index) =>
              index === idx ? response.data : task
            ));
          setIsOpen(false);
        } catch (error) {
          console.error(error);
        }
    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
      <Button size={'icon'} className="bg-green-600 hover:bg-green-500"><Pencil className="cursor-pointer" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Make changes to your task here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task" className="text-right">
              Task
            </Label>
            <Input id="task" value={newItem.text} className="col-span-3" placeholder="Write Task here..." onChange={(e) => setNewItem({...newItem, text: e.target.value})} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
