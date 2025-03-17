
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      toast({
        title: "Task cannot be empty",
        description: "Please enter a task description",
        variant: "destructive",
      });
      return;
    }
    
    onAdd(trimmedText);
    setText('');
    
    toast({
      title: "Task added",
      description: "Your new task has been added",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="glass flex items-center overflow-hidden rounded-lg border border-border shadow-sm">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-transparent px-4 py-3 outline-none todo-input"
          data-cy="add-todo-input"
        />
        <button
          type="submit"
          className="px-4 py-3 text-primary-foreground bg-red-500 hover:bg-red-600 transition-colors duration-200"
          data-cy="add-todo-button"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default AddTodo;
