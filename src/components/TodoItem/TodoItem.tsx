import {FaPenToSquare, FaTrashCan} from "react-icons/fa6";
import s from './TodoItem.module.scss'

// @ts-ignore
const TodoItem = ({text}) => {
   return (
      <li className={s.todoItem}>
         <input className={s.checkbox} type="checkbox"/>
         <h3 className={s.todoText}>{text}</h3>
         <div className={s.btnGroup}>
            <button className={s.rewriteBtn}>
               <FaPenToSquare className={s.btnIcon}/>
            </button>
            <button className={s.deleteBtn}>
               <FaTrashCan className={s.btnIcon}/>
            </button>
         </div>
      </li>
   );
};

export default TodoItem;