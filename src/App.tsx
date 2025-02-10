import { useState } from 'react'
import AddTodo from './components/layout/AddTodo'
import TodoList from './components/layout/TodoList'

const App = () => {
  const [todos, setTodos] = useState<string[]>([]);

  const addTodoHandler = (text : string) => {
    setTodos([...todos, text]);
  }

  return (
    <div>
      <AddTodo addTodoHandler={addTodoHandler} />
      <TodoList items={todos} setItems={setTodos} />
    </div>
  )
}

export default App
