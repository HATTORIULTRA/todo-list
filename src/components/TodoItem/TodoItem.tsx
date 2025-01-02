import {FaPenToSquare, FaTrashCan, FaCheck, FaXmark} from "react-icons/fa6";
import s from './TodoItem.module.scss'

// @ts-ignore
const TodoItem = ({id, title, isDone, deleteTodo, completeTodo, editTodoText, editedTodoValue, setEditedTodoValue, todoIdForEdit, setTodoIdForEdit}) => {

   const isEditing = todoIdForEdit === id;

   const onEditClick = () => {
      console.log(id)
      setTodoIdForEdit(id);
   }

   const onAcceptClick = () => {
      editTodoText();
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
         <input onClick={completeTodo} defaultChecked={isDone} className={s.checkbox} type="checkbox"/>

         {isEditing
            ? (<input value={editedTodoValue} onChange={(e) => setEditedTodoValue(e.target.value)} className={s.editInput} type="text" placeholder='new text' autoFocus/>)
            : (/* @ts-ignore */
               <h3 style={isDone ? completedStyles : null} className={s.todoText}>
                  {title}
               </h3>)
         }
         {isEditing
            ? (<div className={s.btnGroup}>
               <button onClick={onAcceptClick} className={s.rewriteBtn}>
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
               <button onClick={deleteTodo} className={s.deleteBtn}>
                  <FaTrashCan className={s.btnIcon}/>
               </button>
            </div>)
         }
      </li>
   );
};

export default TodoItem;