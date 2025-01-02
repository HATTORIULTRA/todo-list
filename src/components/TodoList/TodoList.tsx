import s from './TodoList.module.scss'
import TodoItem from "../TodoItem/TodoItem.tsx";
import {useState} from "react";

// @ts-ignore
const TodoList = ({todos, deleteTodo, completeTodo, editTodoText, editedTodoValue, setEditedTodoValue}) => {
   const [todoIdForEdit, setTodoIdForEdit] = useState(null)

   return (
      <ul className={s.todoList}>
         {/* @ts-ignore */}
         {todos.map(item => (
            <TodoItem
               completeTodo={() => completeTodo(item.id)}
               deleteTodo={() => deleteTodo(item.id)}
               editTodoText={() => editTodoText(item.id)}
               editedTodoValue={editedTodoValue}
               setEditedTodoValue={setEditedTodoValue}
               todoIdForEdit={todoIdForEdit}
               setTodoIdForEdit={setTodoIdForEdit}
               key={item.id}
               {...item}
            />
         ))}
      </ul>
   );
};

export default TodoList;