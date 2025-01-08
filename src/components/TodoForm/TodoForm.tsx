import {FC, FormEvent, ReactNode} from "react";
import s from './TodoForm.module.scss'

interface TodoFormProps {
   handleSubmit: (e: FormEvent) => void
   newTodoValue: string
   setNewTodoValue: (e: string) => void
   formDirty: boolean
   setFormDirty: (value: boolean) => void
   formError: string
}

const TodoForm: FC<TodoFormProps> = ({handleSubmit, newTodoValue, setNewTodoValue, formDirty, setFormDirty, formError}): ReactNode => {

   const blurHandler = (e: FormEvent): void => {
     if(e.target) {
      setFormDirty(true);
     }
   }

   return (
      <div className={s.formWrapper}>
         <form onSubmit={handleSubmit} className={s.form}>
            <input
               onBlur={(e) => blurHandler(e)}
               value={newTodoValue}
               onChange={(e) => setNewTodoValue(e.target.value)}
               className={s.input}
               type="text"
               placeholder="Task To Be Done..."
            />
            <button type='submit' className={s.button}>Add</button>
         </form>
         {formDirty && newTodoValue.length < 2 && (<div className={s.validation}>{formError}</div>)}
      </div>
   );
};

export default TodoForm;