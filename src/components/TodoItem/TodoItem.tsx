import {FC, ReactNode, useState} from "react";
import {FaPenToSquare, FaTrashCan, FaCheck, FaXmark} from "react-icons/fa6";
import s from './TodoItem.module.scss';

interface TodoItemProps {
   id: number;
   title: string;
   isDone: boolean;
   deleteTodo: (id: number) => void;
   editTodoText: (id: number) => void;
   completeTodo: (id: number) => void;
   editedTodoValue: string;
   setEditedTodoValue: (value: string) => void;
   todoIdForEdit: number | null;
   setTodoIdForEdit: (id: number | null) => void;
}

const TodoItem: FC<TodoItemProps> = ({
                                        id,
                                        title,
                                        isDone,
                                        deleteTodo,
                                        completeTodo,
                                        editTodoText,
                                        editedTodoValue,
                                        setEditedTodoValue,
                                        todoIdForEdit,
                                        setTodoIdForEdit,
                                     }): ReactNode => {
   const [error, setError] = useState<string>('');
   const isEditing: boolean = todoIdForEdit === id;

   const onEditClick = (): void => {
      setEditedTodoValue(title);
      console.log(title)
      setTodoIdForEdit(id);
   };

   const onAcceptClick = (): void => {
      const trimValue = editedTodoValue.trim();

      if (trimValue.length < 2 || trimValue.length > 64) {
         setError("Задача должна содержать от 2 до 64 символов.");
         return;
      }

      const re = /^[a-zA-Z0-9а-яА-ЯёЁ.,!?() ]{2,64}$/;

      if (!re.test(trimValue)) {
         setError("Текст содержит запрещённые символы.");
         return;
      }
      setError("");
      editTodoText(id);
      setTodoIdForEdit(null);
   };

   const onCancelClick = (): void => {
      setEditedTodoValue("");
      setError("");
      setTodoIdForEdit(null);
   };

   const onBlurHandler = (e: any) => {
      if(e.target && e.target.value.length < 2) {
         setError("Поле должно быть заполнено");
      }
   }

   const completedStyles = {
      color: "darkgrey",
      textDecoration: "line-through",
   };

   return (
      <li className={s.todoItem}>
         <input
            onClick={() => completeTodo(id)}
            defaultChecked={isDone}
            className={s.checkbox}
            type="checkbox"
         />

         {isEditing ? (
            <div className={s.editFormWrapper}>
               <input
                  onBlur={(e) => onBlurHandler(e)}
                  value={editedTodoValue}
                  onChange={(e) => setEditedTodoValue(e.target.value)}
                  className={s.editInput}
                  type="text"
                  placeholder="new text"
                  autoFocus
               />
               {error && <div className={s.validation}>{error}</div>}
            </div>
         ) : (
            <h3 style={isDone ? completedStyles : undefined} className={s.todoText}>
               {title}
            </h3>
         )}

         {isEditing ? (
            <div className={s.btnGroup}>
               <button onClick={onAcceptClick} className={s.rewriteBtn}>
                  <FaCheck className={s.btnIcon} />
               </button>
               <button onClick={onCancelClick} className={s.deleteBtn}>
                  <FaXmark className={s.btnIcon} />
               </button>
            </div>
         ) : (
            <div className={s.btnGroup}>
               <button onClick={onEditClick} className={s.rewriteBtn}>
                  <FaPenToSquare className={s.btnIcon} />
               </button>
               <button onClick={() => deleteTodo(id)} className={s.deleteBtn}>
                  <FaTrashCan className={s.btnIcon} />
               </button>
            </div>
         )}
      </li>
   );
};

export default TodoItem;