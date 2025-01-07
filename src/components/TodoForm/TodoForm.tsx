import s from './TodoForm.module.scss'
import {FC, FormEvent} from "react";

interface TodoFormProps {
   handleSubmit: (e: FormEvent) => void
   newTodoValue: string
   setNewTodoValue: (e: string) => void
}

const TodoForm: FC<TodoFormProps> = ({handleSubmit, newTodoValue, setNewTodoValue}) => {
   return (
      <form onSubmit={handleSubmit} className={s.form}>
         <input
            value={newTodoValue}
            onChange={(e) => setNewTodoValue(e.target.value)}
            className={s.input}
            maxLength={64}
            minLength={2}
            type="text"
            placeholder="Task To Be Done..."
         />
         <button type='submit' className={s.button}>Add</button>
      </form>
   );
};

export default TodoForm;