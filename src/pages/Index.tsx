
import { useEffect, useState } from 'react';
import { useTodoStore } from '@/lib/todoStore';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence, motion } from 'framer-motion';

const Index = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const [mounted, setMounted] = useState(false);
  
  // Handle hydration issues with localStorage
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center mb-12">
          <motion.div 
            className="inline-block px-3 py-1 mb-3 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            Stay Organized
          </motion.div>
          <motion.h1 
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            Tasks
          </motion.h1>
        </header>

        <AddTodo onAdd={addTodo} />
        
        <AnimatePresence mode="wait">
          <TodoList 
            todos={todos} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
          />
        </AnimatePresence>
        
        <footer className="mt-10 text-center text-sm text-muted-foreground">
          <p>{todos.length} task{todos.length !== 1 ? 's' : ''} · {todos.filter(t => t.completed).length} completed</p>
        </footer>
      </motion.div>
      <Toaster />
    </div>
  );
};

export default Index;
