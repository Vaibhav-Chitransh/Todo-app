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
      {
        todos.length === 0 ? <div className='text-center mt-10 text-2xl font-bold'>No Tasks to display</div> : <TodoList items={todos} setItems={setTodos} />
      }
    </div>
  )
}

export default App
