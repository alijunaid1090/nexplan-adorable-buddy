
import { useState, useRef, useEffect } from 'react';
import { Trash, Check } from 'lucide-react';
import { Todo } from '@/lib/todoStore';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleDelete = () => {
    setIsExiting(true);
    timeoutRef.current = window.setTimeout(() => {
      onDelete();
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex items-center p-4 mb-2 rounded-lg border border-border bg-card ${
        isExiting ? 'todo-item-exit' : 'todo-item-enter'
      }`}
    >
      <div 
        className="flex items-center justify-center w-6 h-6 mr-3 rounded-full border border-primary cursor-pointer hover:bg-primary/10 transition-all"
        onClick={onToggle}
      >
        {todo.completed && (
          <Check className="w-4 h-4 text-primary" />
        )}
      </div>
      
      <span 
        className={`flex-1 text-base transition-all duration-200 ${
          todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'
        }`}
      >
        {todo.text}
      </span>
      
      <button
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 ml-2 text-muted-foreground hover:text-destructive transition-all duration-200"
        aria-label="Delete todo"
      >
        <Trash className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default TodoItem;
