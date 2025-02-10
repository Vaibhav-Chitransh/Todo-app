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

type EditProps = {
    todos: string[],
    setTodos: (todos: string[]) => void,
    item: string,
    idx: number
}

export function EditTask({todos, setTodos, item, idx} : EditProps) {
    const [newItem, setNewItem] = useState<string>(item);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSubmit = () => {
        setTodos([...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)]);
        setIsOpen(false);
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
            <Input id="task" value={newItem} className="col-span-3" placeholder="Write Task here..." onChange={(e) => setNewItem(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
