import {FaPenToSquare, FaTrashCan, FaCheck, FaXmark} from "react-icons/fa6";
import s from './TodoItem.module.scss';
import {FC, ReactNode} from "react";

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
                         setTodoIdForEdit
                      }): ReactNode => {

   const isEditing = todoIdForEdit === id;

   const onEditClick = () => {
      setTodoIdForEdit(id);
   }

   const onAcceptClick = (id: number) => {
      editTodoText(id);
      setTodoIdForEdit(null);
   }

   const onCancelClick = () => {
      setTodoIdForEdit(null);
   }

   const completedStyles = {
      color: 'darkgrey',
      textDecoration: 'line-through'
   }

   return (
      <li className={s.todoItem}>
         <input onClick={() => completeTodo(id)} defaultChecked={isDone} className={s.checkbox} type="checkbox"/>

         {isEditing
            ? (<input value={editedTodoValue} onChange={(e) => setEditedTodoValue(e.target.value)}
                      className={s.editInput} type="text" placeholder='new text' autoFocus/>)
            : (
               <h3 style={isDone ? completedStyles : undefined} className={s.todoText}>
                  {title}
               </h3>)
         }
         {isEditing
            ? (<div className={s.btnGroup}>
               <button onClick={() => onAcceptClick(id)} className={s.rewriteBtn}>
                  <FaCheck className={s.btnIcon}/>
               </button>
               <button onClick={onCancelClick} className={s.deleteBtn}>
                  <FaXmark className={s.btnIcon}/>
               </button>
            </div>)
            : (<div className={s.btnGroup}>
               <button onClick={onEditClick} className={s.rewriteBtn}>
                  <FaPenToSquare className={s.btnIcon}/>
               </button>
               <button onClick={() => deleteTodo(id)} className={s.deleteBtn}>
                  <FaTrashCan className={s.btnIcon}/>
               </button>
            </div>)
         }
      </li>
   );
};

export default TodoItem;