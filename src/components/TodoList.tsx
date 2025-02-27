
import { motion, AnimatePresence } from 'framer-motion';
import TodoItem from './TodoItem';
import { Todo } from '@/lib/todoStore';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
  const sortedTodos = [...todos].sort((a, b) => {
    // Put completed todos at the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // Sort by creation date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="w-full">
      {todos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No tasks yet. Add one to get started.</p>
        </div>
      ) : (
        <AnimatePresence>
          {sortedTodos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TodoItem
                todo={todo}
                onToggle={() => onToggle(todo.id)}
                onDelete={() => onDelete(todo.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default TodoList;
