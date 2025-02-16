import { useEffect, useState } from 'react';
import AddTodo from './components/layout/AddTodo'
import TodoList from './components/layout/TodoList'
import { ThemeProvider } from "@/components/ui/theme-provider.tsx";
import api from './api/api';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const App = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get('/');
        setTasks(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTasks();
  }, [tasks]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AddTodo />
      {
        tasks.length === 0 ? <div className='text-center mt-10 text-2xl font-bold'>No Tasks to display</div> : <TodoList />
      }
    </ThemeProvider>
  )
}

export default App
